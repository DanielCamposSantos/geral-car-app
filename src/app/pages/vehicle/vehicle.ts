import { Component, computed, inject, input, signal } from '@angular/core';
import { Header } from "../../components/header/header";
import { VehicleDetail } from "../../components/vehicle-detail/vehicle-detail";
import { Veiculo } from '../../services/veiculo';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';

@Component({
  selector: 'app-vehicle',
  imports: [Header, VehicleDetail],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
})
export class Vehicle {
  id = input.required<string>();

  idNumerico = computed(() => Number(this.id()));

  private veiculoService = inject(Veiculo);

  veiculo = signal<VeiculoGetResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const cached = this.veiculoService.findCachedVehicle(this.idNumerico());

    if (cached) {
      this.veiculo.set(cached);
      this.loading.set(false);
      return;
    }

    this.veiculoService.resolveVehicleById(this.idNumerico()).subscribe({
      next: data => {
        this.veiculo.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('Erro ao carregar o veículo');
        this.loading.set(false);
      }
    });
  }
}
