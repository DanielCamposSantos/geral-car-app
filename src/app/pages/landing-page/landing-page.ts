import { Component, inject } from '@angular/core';
import { PrimaryPageLayout } from '../../components/primary-page-layout/primary-page-layout';
import { LandingPageContent } from "../../components/landing-page-content/landing-page-content";
import { VeiculoService } from '../../services/veiculo';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-landing-page',
  imports: [PrimaryPageLayout, LandingPageContent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

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
  }

  onFilter(filters: VeiculoFilter) {
    this.veiculoService.getAll(filters)
  }
}
