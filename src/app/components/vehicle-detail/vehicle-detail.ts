import { Component, computed, inject, input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Galery } from '../galery/galery';
import { MatGridListModule } from '@angular/material/grid-list';
import { SpecsTable } from '../specs-table/specs-table';
import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule, Galery, MatGridListModule, SpecsTable],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.scss',
})
export class VehicleDetail {
  private location = inject(Location);
  private whatsappService = inject(WhatsappService);

  veiculo = input.required<VeiculoGetResponse>();

  veiculoAtual = computed(() => this.veiculo());

  veiculoTitle = computed(() => `${this.veiculo().marca} ${this.veiculo().modelo}`);

  veiculoSubtitle = computed(
    () =>
      `${this.veiculo().ano} · ${this.veiculo().quilometragem.toLocaleString('pt-BR')} km · ${this.veiculo().combustivel}`,
  );

  whatsappLink = computed(() =>
    this.whatsappService.generateLinkWithDetails(
      this.veiculo().marca,
      this.veiculo().modelo,
      this.veiculo().ano,
      this.veiculo().cor,
    ),
  );

  onBack(): void {
    this.location.back();
  }
}