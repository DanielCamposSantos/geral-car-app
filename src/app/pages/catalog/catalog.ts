import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { TipoCombustivel } from '../../models/enums/tipo-combustivel';

@Component({
  selector: 'app-catalog',
  imports: [PrimaryPageLayout, CatalogFilters, CatalogPageContent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private veiculoService = inject(VeiculoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

  private currentFilters: VeiculoFilter = {};

  ngOnInit(): void {
    this.veiculoService.loadFiltros();

    this.route.queryParams.subscribe(params => {
      const filters: VeiculoFilter = {};

      if (params['busca']) {
        filters.busca = String(params['busca']);
      }

      if (params['ano'] !== undefined && params['ano'] !== null && params['ano'] !== '') {
        filters.ano = Number(params['ano']);
      }

      if (params['combustivel']) {
        filters.combustivel = params['combustivel'] as TipoCombustivel;
      }

      this.currentFilters = filters;
      this.veiculoService.getAll(filters, 0, 6);
    });
  }

  onFiltersChange(filters: VeiculoFilter): void {
    this.currentFilters = filters;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.buildQueryParams(filters),
      replaceUrl: true,
    });
  }

  onPageChange(event: { pageIndex: number }): void {
    this.veiculoService.getAll(this.currentFilters, event.pageIndex, 6);
  }

  retry(): void {
    this.veiculoService.getAll(this.currentFilters);
  }

  onVehicleClick(id: number): void {
    this.router.navigate(['/detalhes', id]);
  }

  private buildQueryParams(filters: VeiculoFilter): Record<string, string> {
    const queryParams: Record<string, string> = {};

    if (filters.busca) {
      queryParams['busca'] = filters.busca;
    }
    if (filters.ano !== undefined && filters.ano !== null) {
      queryParams['ano'] = String(filters.ano);
    }
    if (filters.combustivel) {
      queryParams['combustivel'] = filters.combustivel;
    }

    return queryParams;
  }
}