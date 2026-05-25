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
      ? this.buildImageUrl(imagem.publicUrl)
      : '';
  });

  private buildImageUrl(publicUrl: string): string {
    return publicUrl.startsWith('http')
      ? publicUrl
      : `${environment.API_URL}/${publicUrl}`;
  }

  onCardClick(): void {
    this.vehicleClick.emit(this.veiculo().id);
  }
}