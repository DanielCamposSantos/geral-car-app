import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

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
    this.veiculoService.getAll(this.currentFilters);
    this.veiculoService.loadFiltros();
  }

  onVehicleClick(id: number): void {
    this.router.navigate(['/detalhes', id]);
  }
}