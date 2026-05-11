import {
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { SelectorInput, SelectorOption } from '../selector-input/selector-input';
import { Filtros } from '../../models/filtros';
import { VeiculoFilter } from '../../models/veiculo-filter';
import { TipoCombustivel } from '../../models/enums/tipo-combustivel';

@Component({
  selector: 'app-hero',
  imports: [SelectorInput],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  filtros = input.required<Filtros>();
  totalVeiculos = input.required<number>();
  search = output<VeiculoFilter>();

  filters = signal({
    ano: null as number | null,
    combustivel: null as TipoCombustivel | null
  });

  anos = computed<SelectorOption<number | null>[]>(() => [
    {
      label: 'Qualquer ano',
      value: null
    },
    ...this.filtros().anos.map(ano => ({
      label: String(ano),
      value: ano
    }))
  ]);

  combustiveis = computed<SelectorOption<TipoCombustivel | null>[]>(() => [
    {
      label: 'Combustível',
      value: null
    },
    ...this.filtros().combustiveis.map(combustivel => ({
      label: combustivel,
      value: combustivel as TipoCombustivel
    }))
  ]);

  onYearChange(year: number | null) {
    this.filters.update(filters => ({
      ...filters,
      ano: year
    }));
  }

  onFuelChange(combustivel: TipoCombustivel | null) {
    this.filters.update(filters => ({
      ...filters,
      combustivel
    }));
  }

  searchVehicles() {
    const { ano, combustivel } = this.filters();
    this.search.emit({
      ...(ano !== null ? { ano } : {}),
      ...(combustivel !== null ? { combustivel } : {})
    });
  }
}
