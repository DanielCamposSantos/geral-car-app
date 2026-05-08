import { Component, computed, input, Input } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule,],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
})
export class VehicleCard {

  @Input() veiculo: VeiculoGetResponse | undefined;

  realImagePath = computed(() => `${environment.API_URL}/${this.veiculo?.imagens[0].imagePath}`)

  whatsappUrl = input.required<string>()


}
