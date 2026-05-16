import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Page } from '../../models/Page';
import { Filtros } from '../../models/filtros';
import { ActivatedRoute } from '@angular/router';
import { TipoCombustivel } from '../../models/enums/tipo-combustivel';

@Component({
  selector: 'app-catalog',
  imports: [PrimaryPageLayout, CatalogFilters, CatalogPageContent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private veiculoService = inject(VeiculoService);
  private route = inject(ActivatedRoute);

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
  loading = signal(false);
  error = signal<string | null>(null);

  currentFilters: Partial<VeiculoFilter> = {};

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters: Partial<VeiculoFilter> = {};
      if (params['marca']) filters.marca = params['marca'];
      if (params['modelo']) filters.modelo = params['modelo'];
      if (params['ano']) filters.ano = Number(params['ano']);
      if (params['combustivel']) filters.combustivel = params['combustivel'] as TipoCombustivel;

      this.currentFilters = filters;
      this.loadVehicles(filters, 0, 6);
    });
    this.loadFilters();
  }

  onFiltersChange(filters: Partial<VeiculoFilter>) {
    this.currentFilters = filters;
    this.loadVehicles(filters, 0, 6);
  }

  onPageChange(event: { pageIndex: number }) {
    this.loadVehicles(this.currentFilters as VeiculoFilter, event.pageIndex, 6);
  }

  retry() {
    this.loadVehicles(this.currentFilters as VeiculoFilter);
    this.loadFilters();
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
}