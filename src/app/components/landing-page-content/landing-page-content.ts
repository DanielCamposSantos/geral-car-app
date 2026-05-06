import { Component, inject } from '@angular/core';
import { Hero } from '../hero/hero';
import { FeaturedVehicles } from '../featured-vehicles/featured-vehicles';
import { Veiculo } from '../../services/veiculo';

@Component({
  selector: 'app-landing-page-content',
  imports: [Hero,FeaturedVehicles],
  templateUrl: './landing-page-content.html',
  styleUrl: './landing-page-content.scss',
})
export class LandingPageContent {
  veiculoService = inject(Veiculo)

  ngOnInit(){
    this.veiculoService.getAll()
  }

}
