import { Component, computed, inject } from '@angular/core';
import { Veiculo } from '../../services/veiculo';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  veiculoService = inject(Veiculo)

  totalVeiculos = computed(() => this.veiculoService.page().totalElements)
}
