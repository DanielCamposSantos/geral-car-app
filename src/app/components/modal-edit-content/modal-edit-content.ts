import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, input, output, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment.development";
import { TipoCombustivel } from "../../models/enums/tipo-combustivel";
import { VeiculoGetResponse } from "../../models/veiculo-get-response";
import { VeiculoPutRequest } from "../../models/veiculo-put-request";

interface ImagemItem {
  id?: number;
  file?: File;
  imagePath?: string;
  isNew: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-modal-edit-content',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-edit-content.html',
  styleUrl: './modal-edit-content.scss',
})
export class ModalEditContent implements OnInit {
  private fb = inject(FormBuilder)

  veiculo = input.required<VeiculoGetResponse>()
  currentYear = new Date().getFullYear()
  combustivelOptions = Object.values(TipoCombustivel)

  close = output<void>()
  submit = output<{ data: VeiculoPutRequest; imagensParaAdicionar: File[]; imagensParaDeletar: number[] }>()

  imagens = signal<ImagemItem[]>([])

  addForm = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    ano: [this.currentYear, [Validators.required, Validators.min(1950), Validators.max(this.currentYear)]],
    quilometragem: [0, [Validators.required, Validators.min(0)]],
    cor: ['', Validators.required],
    destaque: [false],
    combustivel: [TipoCombustivel.FLEX, Validators.required],
    descricao: ['']
  })

  getImageUrl(imagePath: string): string {
    return `${environment.API_URL}/${imagePath}`;
  }

  ngOnInit() {
    this.addForm.patchValue({
      marca: this.veiculo().marca,
      modelo: this.veiculo().modelo,
      ano: this.veiculo().ano,
      quilometragem: this.veiculo().quilometragem,
      cor: this.veiculo().cor,
      destaque: this.veiculo().destaque,
      combustivel: this.veiculo().combustivel,
      descricao: this.veiculo().descricao
    })

    this.imagens.set(this.veiculo().imagens.map(img => ({
      id: img.id,
      imagePath: img.imagePath,
      isNew: false,
      isDeleted: false
    })))
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const files = Array.from(input.files)
      const novasImagens: ImagemItem[] = files.map(file => ({
        file: file,
        isNew: true,
        isDeleted: false
      }))
      this.imagens.update(current => [...current, ...novasImagens])
    }
    input.value = ''
  }

  removeImagem(index: number) {
    const imagem = this.imagens()[index]
    if (imagem.id) {
      imagem.isDeleted = true
    } else {
      this.imagens.update(current => current.filter((_, i) => i !== index))
    }
  }

  getImagensParaExibir() {
    return this.imagens().filter(img => !img.isDeleted)
  }

  onSubmit() {
    if (this.addForm.valid) {
      const formValue = this.addForm.value

      const updateData: VeiculoPutRequest = {
        id: this.veiculo().id,
        marca: formValue.marca!,
        modelo: formValue.modelo!,
        ano: formValue.ano!,
        quilometragem: formValue.quilometragem!,
        cor: formValue.cor!,
        destaque: formValue.destaque!,
        combustivel: formValue.combustivel!,
        descricao: formValue.descricao || ''
      }

      const imagensParaAdicionar = this.imagens()
        .filter(img => img.isNew && img.file)
        .map(img => img.file!)

      const imagensParaDeletar = this.imagens()
        .filter(img => img.id && img.isDeleted)
        .map(img => img.id!)

      this.submit.emit({
        data: updateData,
        imagensParaAdicionar,
        imagensParaDeletar
      })
    }
  }

  onClose() {
    this.close.emit()
  }

  getObjectURL(file: File): string {
    return window.URL.createObjectURL(file);
  }
}