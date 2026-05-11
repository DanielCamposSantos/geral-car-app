import { Component, computed, input } from '@angular/core';
import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';

@Component({
  selector: 'app-featured-vehicles',
  imports: [VehicleCard],
  templateUrl: './featured-vehicles.html',
  styleUrl: './featured-vehicles.scss',
})
export class FeaturedVehicles {
  veiculos = input.required<VeiculoGetResponse[]>();
  loading = input(false)

  mostrarEmpty = computed(() => {
    return !this.loading() && this.veiculos().length === 0;
  });

  veiculosLimitados = computed(() => this.veiculos().slice(0, 4));

  generateWhatsappLink(marca: string, modelo: string) {
    const NUMBER = '5571982615500';
    const ZAP_URL = `https://wa.me/${NUMBER}?text=`;
    const MENSAGEM = `Ol%C3%A1%2C%20quero%20falar%20sobre%20o%20${marca}%20${modelo}`;
    return `${ZAP_URL}${MENSAGEM}`;
  }
}