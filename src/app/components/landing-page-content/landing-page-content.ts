import { Component, input, output, inject, signal } from '@angular/core';
import { Hero } from '../hero/hero';
import { FeaturedVehicles } from '../featured-vehicles/featured-vehicles';
import { Filtros } from '../../models/filtros';
import { Page } from '../../models/Page';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { VeiculoFilter } from '../../models/veiculo-filter';

@Component({
  selector: 'app-landing-page-content',
  imports: [Hero, FeaturedVehicles],
  templateUrl: './landing-page-content.html',
  styleUrl: './landing-page-content.scss',
})
export class LandingPageContent {
  private veiculoService = inject(VeiculoService);

  veiculos = input.required<Page<VeiculoGetResponse>>();
  filtros = input.required<Filtros>();
  veiculosDestaque = input.required<VeiculoGetResponse[]>();
  loadingDestaques = input(false);
  loading = input(false);
  error = input<string | null>(null);
  search = output<VeiculoFilter>();
  retry = output<void>();
  vehicleClick = output<number>(); // ← novo output

  veiculosDestaque = signal<VeiculoGetResponse[]>([]);
  loadingDestaques = signal(true);

  constructor() {
    this.carregarDestaques();
  }

  private carregarDestaques(): void {
    this.loadingDestaques.set(true);
    this.veiculoService.getDestaques().subscribe({
      next: (dados) => {
        this.veiculosDestaque.set(dados);
        this.loadingDestaques.set(false);
      },
      error: () => {
        this.loadingDestaques.set(false);
      }
    });
  }

  onVehicleClick(id: number): void {
    this.vehicleClick.emit(id);
  }
}