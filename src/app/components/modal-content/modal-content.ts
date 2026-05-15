import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VeiculoPostRequest } from '../../models/veiculo-post-request';
import { TipoCombustivel } from '../../models/enums/tipo-combustivel';

@Component({
  selector: 'app-modal-content',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-content.html',
  styleUrl: './modal-content.scss',
})
export class ModalContent {
  private fb = inject(FormBuilder)
  
  currentYear = new Date().getFullYear()
  combustivelOptions = Object.values(TipoCombustivel)

  close = output<void>()
  submit = output<VeiculoPostRequest>()

  addForm = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    ano: [this.currentYear, [Validators.required, Validators.min(1950), Validators.max(this.currentYear)]],
    quilometragem: [0, [Validators.required, Validators.min(0)]],
    cor: ['',[Validators.required]],
    destaque: [false],
    combustivel: [TipoCombustivel.FLEX, Validators.required],
    descricao: [''],
    imagens: [[] as File[]]
  })

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const files = Array.from(input.files)
      const currentFiles = this.addForm.get('imagens')?.value || []
      this.addForm.patchValue({ imagens: [...currentFiles, ...files] })
    }
  }

  removeImage(index: number) {
    const currentFiles = this.addForm.get('imagens')?.value || []
    const newFiles = [...currentFiles]
    newFiles.splice(index, 1)
    this.addForm.patchValue({ imagens: newFiles })
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.submit.emit(this.addForm.value as VeiculoPostRequest)
      this.addForm.reset()
    }
  }

  onClose() {
    this.close.emit()
  }
}