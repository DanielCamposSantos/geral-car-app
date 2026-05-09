import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../../environments/environment.development';

import { ImagemGetResponse } from '../../models/imagem-get-response';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Galery } from "../galery/galery";

@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule, Galery],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.scss',
})
export class VehicleDetail {
  veiculo = input.required<VeiculoGetResponse>();

  veiculoAtual = computed(() => this.veiculo());

}
