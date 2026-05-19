import { Component, computed, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { SelectorInput, SelectorOption } from "../selector-input/selector-input";
import { Filtros } from "../../models/filtros";
import { TipoCombustivel } from "../../models/enums/tipo-combustivel";
import { VeiculoFilter } from "../../models/veiculo-filter";

@Component({
  selector: 'app-catalog-filters',
  imports: [FormsModule, MatAutocompleteModule, MatInputModule, SelectorInput],
  templateUrl: './catalog-filters.html',
  styleUrl: './catalog-filters.scss',
})
export class CatalogFilters {
  filtros = input.required<Filtros>();
  filtersChange = output<VeiculoFilter>();

  busca = signal('');
  currentAno = signal<number | null>(null);
  currentCombustivel = signal<TipoCombustivel | null>(null);

  sugestoes = computed(() => {
    const termo = this.busca().toLowerCase();
    if (!termo) return [];
    
    const todas = [
      ...this.filtros().marcas,
      ...this.filtros().modelos
    ];
    
    return todas
      .filter(item => item.toLowerCase().includes(termo))
      .slice(0, 5);
  });

  anosOptions = computed<SelectorOption[]>(() => [
    { label: 'Qualquer ano', value: null },
    ...this.filtros().anos.map(ano => ({ label: String(ano), value: ano }))
  ]);

  combustiveisOptions = computed<SelectorOption[]>(() => [
    { label: 'Qualquer combustível', value: null },
    ...this.filtros().combustiveis.map(combustivel => ({
      label: combustivel,
      value: combustivel as TipoCombustivel
    }))
  ]);

  buscar(): void {
    const filters:VeiculoFilter = {};
    
    const termo = this.busca().trim();
    if (termo) filters.busca = termo;
    
    const ano = this.currentAno();
    if (ano !== null && ano !== undefined) filters.ano = ano;
    
    const combustivel = this.currentCombustivel();
    if (combustivel !== null && combustivel !== undefined) filters.combustivel = combustivel;

    this.filtersChange.emit(filters);
  }

  onAnoChange(ano: number | null): void {
    this.currentAno.set(ano);
  }

  onCombustivelChange(combustivel: TipoCombustivel | null): void {
    this.currentCombustivel.set(combustivel);
  }

  limparFiltros(): void {
    this.busca.set('');
    this.currentAno.set(null);
    this.currentCombustivel.set(null);
    this.buscar();
  }
}