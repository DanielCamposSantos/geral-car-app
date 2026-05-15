import { Component, input, output, OnInit, inject, signal } from '@angular/core';
import { Hero } from '../hero/hero';
import { FeaturedVehicles } from '../featured-vehicles/featured-vehicles';
import { Filtros } from '../../models/filtros';
import { Page } from '../../models/page';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { VeiculoService } from '../../services/veiculo';

@Component({
  selector: 'app-landing-page-content',
  imports: [Hero, FeaturedVehicles],
  templateUrl: './landing-page-content.html',
  styleUrl: './landing-page-content.scss',
})
export class LandingPageContent implements OnInit {
  private veiculoService = inject(VeiculoService)

  veiculos = input.required<Page<VeiculoGetResponse>>();
  filtros = input.required<Filtros>();
  loading = input(false);
  error = input<string | null>(null);
  search = output<VeiculoFilter>();
  retry = output<void>();

  veiculosDestaque = signal<VeiculoGetResponse[]>([]);
  loadingDestaques = signal(true);

  ngOnInit() {
    this.carregarDestaques();
  }

  carregarDestaques() {
    this.loadingDestaques.set(true);
    this.veiculoService.getDestaques().subscribe({
      next: (dados) => {
        this.veiculosDestaque.set(dados);
        this.loadingDestaques.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar destaques:', err);
        this.loadingDestaques.set(false);
      }
    });
  }
}