import { Component, inject, input, output } from "@angular/core";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { Filtros } from "../../models/filtros";
import { Page } from "../../models/page";
import { VeiculoGetResponse } from "../../models/veiculo-get-response";
import { VehicleCard } from "../vehicle-card/vehicle-card";
import { WhatsappService } from "../../services/whatsapp";

@Component({
  selector: 'app-catalog-page-content',
  imports: [VehicleCard, MatPaginatorModule],
  templateUrl: './catalog-page-content.html',
  styleUrl: './catalog-page-content.scss',
})
export class CatalogPageContent {
  whatsappService = inject(WhatsappService);
  
  veiculos = input.required<Page<VeiculoGetResponse>>();
  filtros = input.required<Filtros>();
  loading = input(false);
  error = input<string | null>(null);
  retry = output();
  pageChange = output<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  generateWhatsappLink(marca: string, modelo: string) {
    return this.whatsappService.generateLink(marca, modelo);
  }
}