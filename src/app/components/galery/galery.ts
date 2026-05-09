import { Component, computed, input, signal } from '@angular/core';
import { ImagemGetResponse } from '../../models/imagem-get-response';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-galery',
  imports: [],
  templateUrl: './galery.html',
  styleUrl: './galery.scss',
})
export class Galery {
  images = input.required<ImagemGetResponse[]>()
  veiculo = input.required<VeiculoGetResponse>()
  
  
  selectedImageIndex = signal<number>(0);

  realImagePath = computed(() =>
    this.images().map(
      image => `${environment.API_URL}/${image.imagePath}`
    )
  );

  getImageUrl(image: ImagemGetResponse) {
    return `${environment.API_URL}/${image.imagePath}`;
  }

  
  selecionarImagem(image: ImagemGetResponse) {
    const index = this.images().findIndex(img => img.id === image.id);
    if (index !== -1) {
      this.selectedImageIndex.set(index);
    }
  }

  
  currentMainImage = computed(() => {
    const index = this.selectedImageIndex();
    return this.images()[index];
  });
}