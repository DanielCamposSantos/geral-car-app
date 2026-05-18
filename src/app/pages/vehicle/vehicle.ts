import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { VehicleDetail } from "../../components/vehicle-detail/vehicle-detail";
import { VeiculoService } from '../../services/veiculo';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';

@Component({
  selector: 'app-vehicle',
  imports: [Header, VehicleDetail],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
})
export class Vehicle implements OnInit {
  id = input.required<string>();

  idNumerico = computed(() => Number(this.id()));

  private veiculoService = inject(VeiculoService);

  veiculo = signal<VeiculoGetResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.carregarVeiculo();
  }

  private carregarVeiculo(): void {
    this.loading.set(true);
    this.error.set(null);

    this.veiculoService.getById(this.idNumerico()).subscribe({
      next: (data) => {
        this.veiculo.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar os dados do veículo');
        this.loading.set(false);
      }
    });
  }
}