import { Component, computed, inject, input, output, signal } from '@angular/core';
import { SelectorInput, SelectorOption } from '../selector-input/selector-input';
import { Filtros } from '../../models/filtros';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { TipoCombustivel } from '../../models/enums/tipo-combustivel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [SelectorInput],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private router = inject(Router);
  filtros = input.required<Filtros>();
  totalVeiculos = input.required<number>();
  search = output<VeiculoFilter>();
  filters = signal<{ ano: number | null; combustivel: TipoCombustivel | null }>({ ano: null, combustivel: null });
  
  anos = computed<SelectorOption<number | null>[]>(() => [
    { label: 'Qualquer ano', value: null },
    ...this.filtros().anos.map(ano => ({ label: String(ano), value: ano }))
  ]);
  
  combustiveis = computed<SelectorOption<TipoCombustivel | null>[]>(() => [
    { label: 'Qualquer combustível', value: null },
    ...this.filtros().combustiveis.map(combustivel => ({
      label: combustivel,
      value: combustivel as TipoCombustivel
    }))
  ]);
  
  onYearChange(year: unknown) {
    const value = typeof year === 'number' ? year : null;
    this.filters.update(filters => ({ ...filters, ano: value }));
  }
  
  onFuelChange(combustivel: unknown) {
    const value = typeof combustivel === 'string' ? (combustivel as TipoCombustivel) : null;
    this.filters.update(filters => ({ ...filters, combustivel: value }));
  }
  
  searchVehicles() {
    const { ano, combustivel } = this.filters();
    const filters: VeiculoFilter = {};
    if (ano !== null) filters.ano = ano;
    if (combustivel !== null) filters.combustivel = combustivel;
    this.search.emit(filters);
    this.router.navigate(['/catalog'], { queryParams: filters });
  }
}