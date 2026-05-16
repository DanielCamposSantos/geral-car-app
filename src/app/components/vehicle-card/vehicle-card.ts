import { Component, computed, inject, input } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
})
export class VehicleCard {
  private router = inject(Router);

  veiculo =  input.required<VeiculoGetResponse>();

  whatsappUrl = input.required<string>();

  realImagePath = computed(() => {
    return `${environment.API_URL}/${
      this.veiculo().imagens[0].imagePath
    }`;
  });

  openDetails() {
    this.router.navigate(['/detalhes', this.veiculo().id]);
  }
}
