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
      ? `${environment.API_URL}/${imagem.imagePath}` 
      : '';
  });

  onVehicleClick(): void {
    this.vehicleClick.emit(this.veiculo().id);
  }
}