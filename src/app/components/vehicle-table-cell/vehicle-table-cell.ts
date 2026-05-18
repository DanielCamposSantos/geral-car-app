import { Component, computed, input, output } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-vehicle-table-cell',
  imports: [],
  templateUrl: './vehicle-table-cell.html',
  styleUrl: './vehicle-table-cell.scss',
})
export class VehicleTableCell {
  veiculo = input.required<VeiculoGetResponse>();
  
  vehicleClick = output<number>();

  realImagePath = computed(() => {
    const imagem = this.veiculo().imagens?.[0];
    return imagem 
      ? `${environment.API_URL}/${imagem.imagePath}` 
      : '';
  });

  onCardClick(): void {
    this.vehicleClick.emit(this.veiculo().id);
  }
}