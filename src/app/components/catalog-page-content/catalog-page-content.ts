import { Component, computed, input, output } from '@angular/core';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { Page } from '../../models/page';
import { Filtros } from '../../models/filtros';

@Component({
  selector: 'app-catalog-page-content',
  imports: [],
  templateUrl: './catalog-page-content.html',
  styleUrl: './catalog-page-content.scss',
})
export class CatalogPageContent {
  veiculos = input.required<Page<VeiculoGetResponse>>()
  filtros = input.required<Filtros>()
  loading = input(false)
  error = input<string | null>(null)
  retry = output()

}
