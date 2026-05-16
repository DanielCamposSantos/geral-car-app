import { Component, inject, signal } from '@angular/core';
import { PrimaryPageLayout } from '../../components/primary-page-layout/primary-page-layout';
import { LandingPageContent } from "../../components/landing-page-content/landing-page-content";
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { Page } from '../../models/Page';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Filtros } from '../../models/filtros';

@Component({
  selector: 'app-landing-page',
  imports: [PrimaryPageLayout, LandingPageContent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private veiculoService = inject(VeiculoService);

  veiculos = signal<Page<VeiculoGetResponse>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 6,
  });

  filtros = signal<Filtros>({
    marcas: [],
    modelos: [],
    anos: [],
    combustiveis: [],
  });

  destaques = signal<VeiculoGetResponse[]>([]);
  loadingDestaques = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadVehicles();
    this.loadFilters();
    this.loadFeaturedVehicles();
  }

  retry() {
    this.loadVehicles();
    this.loadFilters();
    this.loadFeaturedVehicles();
  }

  onFilter(filters: VeiculoFilter) {
    this.loadVehicles(filters);
  }

  private loadVehicles(filters?: VeiculoFilter, page: number = 0, size: number = 6) {
    this.loading.set(true);
    this.error.set(null);

    this.veiculoService.getAll(filters, page, size).subscribe({
      next: pageData => {
        this.veiculos.set(pageData);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('Não foi possível carregar os veículos');
        this.loading.set(false);
      }
    });
  }

  private loadFilters() {
    this.veiculoService.loadFiltros().subscribe({
      next: filtros => this.filtros.set(filtros),
      error: err => {
        console.error(err);
        this.error.set('Não foi possível carregar os filtros');
      }
    });
  }

  private loadFeaturedVehicles() {
    this.loadingDestaques.set(true);
    this.veiculoService.getDestaques().subscribe({
      next: (dados) => {
        this.destaques.set(dados);
        this.loadingDestaques.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar destaques:', err);
        this.loadingDestaques.set(false);
      }
    });
  }
}
