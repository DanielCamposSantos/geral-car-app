import { Component, computed, inject, input } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';
import { VeiculoService } from '../../services/veiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-table-cell',
  imports: [],
  templateUrl: './vehicle-table-cell.html',
  styleUrl: './vehicle-table-cell.scss',
})
export class VehicleTableCell {
  private router = inject(Router);

  private veiculoService = inject(VeiculoService);

  veiculo = input.required<VeiculoGetResponse>()

  realImagePath = computed(() => {
    return `${environment.API_URL}/${this.veiculo().imagens[0].imagePath
      }`;
  });

  openDetails() {
    this.veiculoService.selectVehicle(this.veiculo());

    this.router.navigate([
      '/detalhes',
      this.veiculo().id
    ]);
  }
}