import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';

@Component({
  selector: 'app-specs-table',
  imports: [CommonModule],
  templateUrl: './specs-table.html',
  styleUrl: './specs-table.scss',
})
export class SpecsTable {
  veiculo = input.required<VeiculoGetResponse>();
  veiculoAtual = computed(() => this.veiculo());
}
