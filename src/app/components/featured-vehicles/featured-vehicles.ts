import { Component, computed, inject, input } from '@angular/core';
import { Veiculo } from '../../services/veiculo';
import { VehicleCard } from '../vehicle-card/vehicle-card';

@Component({
  selector: 'app-featured-vehicles',
  imports: [VehicleCard],
  templateUrl: './featured-vehicles.html',
  styleUrl: './featured-vehicles.scss',
})
export class FeaturedVehicles {

  veiculoService = inject(Veiculo);

  veiculosCompleto = computed(() => this.veiculoService.page().content || []);

  veiculosLimitados = computed(() => this.veiculosCompleto().slice(0, 4));

  generateWhatsappLink(marca:string,modelo:string){
    const NUMBER :string = "5571982615500"
    const ZAP_URL:string = `https://wa.me/${NUMBER}?text=`
    const MENSSAGEM:string = `Ol%C3%A1%2C%20quero%20falar%20sobre%20o%20${marca}%20${modelo}`
    return `${ZAP_URL}${MENSSAGEM}`;
  }
}