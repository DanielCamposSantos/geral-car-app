import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainContent } from '../../components/admin-main-content/admin-main-content';
import { SideBarAdmin } from '../../components/side-bar-admin/side-bar-admin';
import { ModalContent } from '../../components/modal-content/modal-content';
import {MatTableModule} from '@angular/material/table';
import { VeiculoService } from '../../services/veiculo';

@Component({
  selector: 'app-admin-veiculos',
  imports: [CommonModule, SideBarAdmin, AdminMainContent, ModalContent, MatTableModule],
  templateUrl: './admin-veiculos.html',
  styleUrl: './admin-veiculos.scss',
})
export class AdminVeiculos {
   private veiculoService = inject(VeiculoService)
   showModal = signal(false);

  veiculos = this.veiculoService.page
  filtros = this.veiculoService.filtros
  loading = this.veiculoService.loading
  error = this.veiculoService.error

  totalVehicles = computed(() => this.veiculos().totalElements);

  ngOnInit() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
  }

  retry() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
