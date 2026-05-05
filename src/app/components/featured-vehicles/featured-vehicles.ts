import { Component, computed, inject } from '@angular/core';
import { Veiculo } from '../../services/veiculo';
import { VehicleCard } from '../vehicle-card/vehicle-card';

@Component({
  selector: 'app-featured-vehicles',
  imports: [VehicleCard],
  templateUrl: './featured-vehicles.html',
  styleUrl: './featured-vehicles.scss',
})
export class FeaturedVehicles {

  
  veiculoService = inject(Veiculo)
  
  veiculos = computed(() => this.veiculoService.page().content)
}
