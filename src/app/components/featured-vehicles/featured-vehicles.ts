import { Component, computed, inject, input, output } from '@angular/core';
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
  private whatsappService = inject(WhatsappService);

  veiculos = input.required<VeiculoGetResponse[]>();
  loading = input(false);
  
  vehicleClick = output<number>();

  mostrarEmpty = computed(() => {
    return !this.loading() && this.veiculos().length === 0;
  });

  veiculosLimitados = computed(() => this.veiculos());

  generateWhatsappLink(marca: string, modelo: string): string {
    return this.whatsappService.generateLink(marca, modelo);
  }

  onVehicleClick(id: number): void {
    this.vehicleClick.emit(id);
  }
}