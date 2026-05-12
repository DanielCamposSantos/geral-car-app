import { Component, computed, inject, input } from '@angular/core';
import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { WhatsappService } from '../../services/whatsapp';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-featured-vehicles',
  imports: [VehicleCard, RouterLink],
  templateUrl: './featured-vehicles.html',
  styleUrl: './featured-vehicles.scss',
})
export class FeaturedVehicles {
  whatsappService = inject(WhatsappService)

  veiculos = input.required<VeiculoGetResponse[]>();
  loading = input(false)

  

  mostrarEmpty = computed(() => {
    return !this.loading() && this.veiculos().length === 0;
  });

  veiculosLimitados = computed(() => this.veiculos().slice(0, 4));

  generateWhatsappLink(marca: string, modelo: string) {
    return this.whatsappService.generateLink(marca, modelo);
  }
}