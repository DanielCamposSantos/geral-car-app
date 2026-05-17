import { Component, computed, input, output, signal, ViewChild } from "@angular/core";
import { SelectorInput, SelectorOption } from "../selector-input/selector-input";
import { Filtros } from "../../models/filtros";
import { TipoCombustivel } from "../../models/enums/tipo-combustivel";
import { VeiculoFilter } from "../../models/veiculo-filter";

interface FiltrosAplicados {
  marca?: string;
  modelo?: string;
  ano?: number;
  combustivel?: TipoCombustivel;
}

@Component({
  selector: 'app-catalog-filters',
  imports: [SelectorInput],
  templateUrl: './catalog-filters.html',
  styleUrl: './catalog-filters.scss',
})
export class CatalogFilters {
  filtros = input.required<Filtros>();
  filtersChange = output<Partial<VeiculoFilter>>();

  @ViewChild('marcaSelector') marcaSelector!: SelectorInput;
  @ViewChild('modeloSelector') modeloSelector!: SelectorInput;
  @ViewChild('anoSelector') anoSelector!: SelectorInput;
  @ViewChild('combustivelSelector') combustivelSelector!: SelectorInput;

  currentMarca = signal<string | null>(null);
  currentModelo = signal<string | null>(null);
  currentAno = signal<number | null>(null);
  currentCombustivel = signal<TipoCombustivel | null>(null);

  marcasOptions = computed<SelectorOption[]>(() => [
    { label: 'Qualquer marca', value: null },
    ...this.filtros().marcas.map(marca => ({ label: marca, value: marca }))
  ]);

  modelosOptions = computed<SelectorOption[]>(() => [
    { label: 'Qualquer modelo', value: null },
    ...this.filtros().modelos.map(modelo => ({ label: modelo, value: modelo }))
  ]);

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
    const filters: FiltrosAplicados = {};
    const marca = this.currentMarca();
    const modelo = this.currentModelo();
    const ano = this.currentAno();
    const combustivel = this.currentCombustivel();

    if (marca !== null && marca !== undefined) filters.marca = marca;
    if (modelo !== null && modelo !== undefined) filters.modelo = modelo;
    if (ano !== null && ano !== undefined) filters.ano = ano;
    if (combustivel !== null && combustivel !== undefined) filters.combustivel = combustivel;

    this.filtersChange.emit(filters);
  }
  onMarcaChange(marca: unknown): void {
    this.currentMarca.set(typeof marca === 'string' ? marca : null);
  }

  onModeloChange(modelo: unknown): void {
    this.currentModelo.set(typeof modelo === 'string' ? modelo : null);
  }

  onAnoChange(ano: unknown): void {
    this.currentAno.set(typeof ano === 'number' ? ano : null);
  }

  onCombustivelChange(combustivel: unknown): void {
    const value = typeof combustivel === 'string' ? (combustivel as TipoCombustivel) : null;
    this.currentCombustivel.set(value);
  }

  limparFiltros(): void {
    this.currentMarca.set(null);
    this.currentModelo.set(null);
    this.currentAno.set(null);
    this.currentCombustivel.set(null);

    if (this.marcaSelector) this.marcaSelector.resetToDefault();
    if (this.modeloSelector) this.modeloSelector.resetToDefault();
    if (this.anoSelector) this.anoSelector.resetToDefault();
    if (this.combustivelSelector) this.combustivelSelector.resetToDefault();

    this.buscar();
  }
}