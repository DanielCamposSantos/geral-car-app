import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideBarAdmin } from '../../components/side-bar-admin/side-bar-admin';
import { ModalContent } from '../../components/modal-content/modal-content';
import { ModalEditContent } from '../../components/modal-edit-content/modal-edit-content';
import { VehicleTableCell } from '../../components/vehicle-table-cell/vehicle-table-cell';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { VeiculoService } from '../../services/veiculo';
import { VeiculoPostRequest } from '../../models/veiculo-post-request';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { VeiculoPutRequest } from '../../models/veiculo-put-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-veiculos',
  imports: [CommonModule,SideBarAdmin, ModalContent, ModalEditContent, VehicleTableCell],
  templateUrl: './admin-veiculos.html',
  styleUrl: './admin-veiculos.scss',
})
export class AdminVeiculos {
  private veiculoService = inject(VeiculoService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  showModal = signal(false);
  showEditModal = signal(false);
  selectedVehicle = signal<VeiculoGetResponse | null>(null);

  veiculos = this.veiculoService.page;
  filtros = this.veiculoService.filtros;
  loading = this.veiculoService.loading;
  error = this.veiculoService.error;

  totalVehicles = computed(() => this.veiculos().totalElements);
  totalDestaques = signal(0);

  constructor() {
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    this.veiculoService.getAll();
    this.veiculoService.loadFiltros();
    this.carregarTotalDestaques();
  }

  private carregarTotalDestaques(): void {
    this.veiculoService.getDestaqueCount().subscribe({
      next: (count) => this.totalDestaques.set(count),
      error: () => this.showToast('Erro ao carregar total de destaques', 'error')
    });
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: `toast-${type}`
    });
  }

  private openConfirmDialog(title: string, message: string) {
    return this.dialog.open(ConfirmDialog, {
      data: { title, message } as ConfirmDialogData,
      panelClass: 'confirm-dialog-panel'
    }).afterClosed();
  }

  retry(): void {
    this.carregarDadosIniciais();
  }

  openModal(): void {
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  openEditModal(veiculo: VeiculoGetResponse): void {
    this.selectedVehicle.set(veiculo);
    this.showEditModal.set(true);
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedVehicle.set(null);
  }

  createVeiculo(data: VeiculoPostRequest): void {
    this.veiculoService.create(data).subscribe({
      next: () => {
        this.recarregarAposOperacao();
        this.closeModal();
        this.showToast('Veículo criado com sucesso!');
      },
      error: () => this.showToast('Erro ao criar veículo', 'error')
    });
  }

  updateVeiculo(event: { data: VeiculoPutRequest; imagensParaAdicionar: File[]; imagensParaDeletar: number[] }): void {
    this.openConfirmDialog('Atualizar Veículo', 'Deseja realmente salvar as alterações?')
      .subscribe((confirmed) => {
        if (!confirmed) return;

        this.veiculoService.update(event.data).subscribe({
          next: () => this.processarImagens(event),
          error: () => this.showToast('Erro ao atualizar veículo', 'error')
        });
      });
  }

  private async processarImagens(event: { data: VeiculoPutRequest; imagensParaAdicionar: File[]; imagensParaDeletar: number[] }): Promise<void> {
    try {
      for (const imagemId of event.imagensParaDeletar) {
        await this.veiculoService.deleteImagem(event.data.id, imagemId).toPromise();
      }

      if (event.imagensParaAdicionar.length > 0) {
        await this.veiculoService.addImagens(event.data.id, event.imagensParaAdicionar).toPromise();
      }

      this.recarregarAposOperacao();
      this.closeEditModal();
      this.showToast('Veículo atualizado com sucesso!');
    } catch {
      this.showToast('Erro ao processar imagens', 'error');
    }
  }

  toggleDestaque(veiculo: VeiculoGetResponse, event: Event): void {
    const input = event.target as HTMLInputElement;
    const novoEstado = input.checked;
    const estadoAnterior = veiculo.destaque;

    veiculo.destaque = novoEstado;

    this.veiculoService.toggleDestaque(veiculo.id, novoEstado).subscribe({
      next: () => {
        const ajuste = novoEstado !== estadoAnterior ? (novoEstado ? 1 : -1) : 0;
        this.totalDestaques.update(current => current + ajuste);
        this.showToast('Destaque atualizado com sucesso!');
      },
      error: () => {
        veiculo.destaque = estadoAnterior;
        input.checked = estadoAnterior;
        this.showToast('Erro ao alterar destaque', 'error');
      }
    });
  }

  deleteVeiculo(veiculo: VeiculoGetResponse): void {
    this.openConfirmDialog(
      'Excluir Veículo',
      `Deseja realmente excluir ${veiculo.marca} ${veiculo.modelo}?`
    ).subscribe((confirmed) => {
      if (!confirmed) return;

      this.veiculoService.delete(veiculo.id).subscribe({
        next: () => {
          this.recarregarAposOperacao();
          this.showToast('Veículo excluído com sucesso!');
        },
        error: () => this.showToast('Erro ao excluir veículo', 'error')
      });
    });
  }

  private recarregarAposOperacao(): void {
    this.veiculoService.getAll();
    this.carregarTotalDestaques();
  }
}