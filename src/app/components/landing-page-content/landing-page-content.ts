import { Component, input, output } from '@angular/core';
import { Hero } from '../hero/hero';
import { FeaturedVehicles } from '../featured-vehicles/featured-vehicles';
import { Filtros } from '../../models/filtros';
import { Page } from '../../models/page';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { VeiculoFilter } from '../../models/veiculo-filter';

@Component({
  selector: 'app-landing-page-content',
  imports: [Hero, FeaturedVehicles],
  templateUrl: './landing-page-content.html',
  styleUrl: './landing-page-content.scss',
})
export class LandingPageContent {
  veiculos = input.required<Page<VeiculoGetResponse>>();
  filtros = input.required<Filtros>();
  loading = input(false);
  error = input<string | null>(null);
  search = output<VeiculoFilter>();
  retry = output<void>();

  
}