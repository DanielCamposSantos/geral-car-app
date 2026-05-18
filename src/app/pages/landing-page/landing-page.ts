import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryPageLayout } from '../../components/primary-page-layout/primary-page-layout';
import { LandingPageContent } from "../../components/landing-page-content/landing-page-content";
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';

@Component({
  selector: 'app-landing-page',
  imports: [PrimaryPageLayout, LandingPageContent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private veiculoService = inject(VeiculoService);
  private router = inject(Router);

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

  constructor() {
    this.veiculoService.getAll();
    this.veiculoService.loadFiltros();
  }

  retry(): void {
    this.veiculoService.getAll();
  }

  onFilter(filters: VeiculoFilter): void {
    this.veiculoService.getAll(filters);
  }

  onVehicleClick(id: number): void {
    this.router.navigate(['/detalhes', id]);
  }
}