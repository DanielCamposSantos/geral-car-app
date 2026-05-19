import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';

@Component({
  selector: 'app-catalog',
  imports: [PrimaryPageLayout, CatalogFilters, CatalogPageContent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private veiculoService = inject(VeiculoService);
  private router = inject(Router);

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

  private currentFilters: VeiculoFilter = {};

  constructor() {
    this.veiculoService.getAll();
    this.veiculoService.loadFiltros();
  }

  onFiltersChange(filters: VeiculoFilter): void {
    this.currentFilters = filters;
    this.veiculoService.getAll(filters, 0, 6);
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
}