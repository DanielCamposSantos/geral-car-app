import { Component, inject, OnInit } from '@angular/core';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogFilters } from '../../components/catalog-filters/catalog-filters';
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';
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

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

  currentFilters: any = {};

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters: any = {};
      if (params['marca']) filters.marca = params['marca'];
      if (params['modelo']) filters.modelo = params['modelo'];
      if (params['ano']) filters.ano = Number(params['ano']);
      if (params['combustivel']) filters.combustivel = params['combustivel'] as TipoCombustivel;
      
      this.currentFilters = filters;
      this.veiculoService.getAll(filters, 0, 6);
    });
    this.veiculoService.loadFiltros();
  }

  onFiltersChange(filters: any) {
    this.currentFilters = filters;
    this.veiculoService.getAll(filters, 0, 6);
  }

  onPageChange(event: any) {
    this.veiculoService.getAll(this.currentFilters, event.pageIndex, 6);
  }

  retry() {
    this.veiculoService.getAll(this.currentFilters);
    this.veiculoService.loadFiltros();
  }
}