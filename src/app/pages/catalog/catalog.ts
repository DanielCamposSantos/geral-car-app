import { Component, inject } from '@angular/core';
import { PrimaryPageLayout } from "../../components/primary-page-layout/primary-page-layout";
import { CatalogPageContent } from '../../components/catalog-page-content/catalog-page-content';
import { VeiculoService } from '../../services/veiculo';

@Component({
  selector: 'app-catalog',
  imports: [PrimaryPageLayout, CatalogPageContent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private veiculoService = inject(VeiculoService)

  veiculos = this.veiculoService.page
  filtros = this.veiculoService.filtros
  loading = this.veiculoService.loading
  error = this.veiculoService.error

  ngOnInit() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
  }

  retry() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
  }
}
