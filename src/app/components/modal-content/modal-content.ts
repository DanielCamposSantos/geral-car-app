import { Component, inject, input, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  loading = input(false)

  imagensControl = this.fb.control<File[]>([], this.requireAtLeastOneImage)

  addForm = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    ano: [this.currentYear, [Validators.required, Validators.min(1950), Validators.max(this.currentYear)]],
    quilometragem: [0, [Validators.required, Validators.min(0)]],
    cor: ['',[Validators.required]],
    destaque: [false],
    combustivel: [TipoCombustivel.FLEX, Validators.required],
    descricao: ['', Validators.maxLength(500)],
    imagens: this.imagensControl
  })

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const files = Array.from(input.files)
      const currentFiles = this.imagensControl.value || []
      this.imagensControl.setValue([...currentFiles, ...files])
    }
  }

  removeImage(index: number) {
    const currentFiles = this.imagensControl.value || []
    const newFiles = [...currentFiles]
    newFiles.splice(index, 1)
    this.imagensControl.setValue(newFiles)
  }

  onSubmit() {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.submit.emit(this.addForm.value as VeiculoPostRequest)
    this.addForm.reset({
      marca: '',
      modelo: '',
      ano: this.currentYear,
      quilometragem: 0,
      cor: '',
      destaque: false,
      combustivel: TipoCombustivel.FLEX,
      descricao: '',
      imagens: []
    })
  }

  private requireAtLeastOneImage(control: AbstractControl) {
    const value = control.value as File[] | undefined
    return Array.isArray(value) && value.length > 0 ? null : { required: true }
  }

  onClose() {
    this.close.emit()
  }
}