import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { Veiculo } from '../../services/veiculo';

import {
  SelectorInput,
  SelectorOption
} from '../selector-input/selector-input';

@Component({
  selector: 'app-hero',
  imports: [SelectorInput],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

  veiculoService = inject(Veiculo);

  filterOptions = this.veiculoService.filtros;

  totalVeiculos = computed(() =>
    this.veiculoService.page().totalElements
  );

  filters = signal({
    ano: null as number | null,
    combustivel: null as string | null
  });

  anos = computed<SelectorOption<number | null>[]>(() => [
    {
      label: 'Qualquer ano',
      value: null
    },
    ...this.filterOptions().anos.map(ano => ({
      label: String(ano),
      value: ano
    }))
  ]);

  combustiveis = computed<SelectorOption<string | null>[]>(() => [
    {
      label: "Combustível",
      value: null
    },
    ...this.filterOptions().combustiveis.map(combustivel => ({
      label: combustivel,
      value: combustivel
    }))
  ])


  onYearChange(year: number | null) {
    this.filters.update(filters => ({
      ...filters,
      ano: year
    }));

  }

}