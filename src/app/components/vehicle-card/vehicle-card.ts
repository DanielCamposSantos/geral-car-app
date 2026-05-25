import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
})
export class VehicleCard {
  veiculo = input.required<VeiculoGetResponse>();
  whatsappUrl = input.required<string>();
  
  vehicleClick = output<number>();

  realImagePath = computed(() => {
    const imagem = this.veiculo().imagens?.[0];
    return imagem
      ? this.buildImageUrl(imagem.publicUrl)
      : '';
  });

  private buildImageUrl(publicUrl: string): string {
    return publicUrl.startsWith('http')
      ? publicUrl
      : `${environment.API_URL}/${publicUrl}`;
  }

  onVehicleClick(): void {
    this.vehicleClick.emit(this.veiculo().id);
  }
}