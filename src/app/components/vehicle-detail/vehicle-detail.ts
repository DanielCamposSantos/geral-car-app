import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Galery } from '../galery/galery';

import { MatGridListModule } from '@angular/material/grid-list';
import { SpecsTable } from '../specs-table/specs-table';
@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule, Galery, MatGridListModule,SpecsTable],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.scss',
})
export class VehicleDetail {
  location = inject(Location);

  veiculo = input.required<VeiculoGetResponse>();

  veiculoAtual = computed(() => this.veiculo());

  veiculoTitle = computed(() => `${this.veiculo().marca} ${this.veiculo().modelo}`);

  veiculoSubtitle = computed(
    () =>
      `${this.veiculo().ano} · ${this.veiculo().quilometragem.toLocaleString('pt-BR')} km · ${this.veiculo().combustivel}`,
  );

  onBack() {
    this.location.back();
  }
}
