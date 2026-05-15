import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideBarAdmin } from '../../components/side-bar-admin/side-bar-admin';
import { ModalContent } from '../../components/modal-content/modal-content';
import { ModalEditContent } from '../../components/modal-edit-content/modal-edit-content';
import { VehicleTableCell } from '../../components/vehicle-table-cell/vehicle-table-cell';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { MatTableModule } from '@angular/material/table';
import { VeiculoService } from '../../services/veiculo';
import { VeiculoPostRequest } from '../../models/veiculo-post-request';
import { VeiculoPostResponse } from '../../models/veiculo-post-response';
import { VeiculoGetResponse } from '../../models/veiculo-get-response';
import { VeiculoPutRequest } from '../../models/veiculo-put-request';

@Component({
  selector: 'app-admin-veiculos',
  imports: [CommonModule, SideBarAdmin, ModalContent, ModalEditContent, VehicleTableCell, MatTableModule],
  templateUrl: './admin-veiculos.html',
  styleUrl: './admin-veiculos.scss',
})
export class AdminVeiculos implements OnInit {
  private veiculoService = inject(VeiculoService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  showModal = signal(false);
  showEditModal = signal(false);
  selectedVehicle = signal<VeiculoGetResponse | null>(null);

  veiculos = this.veiculoService.page
  filtros = this.veiculoService.filtros
  loading = this.veiculoService.loading
  error = this.veiculoService.error

  totalVehicles = computed(() => this.veiculos().totalElements);
  totalDestaques = signal(0);

  ngOnInit() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
    this.carregarTotalDestaques()
  }

  carregarTotalDestaques() {
    this.veiculoService.getDestaqueCount().subscribe({
      next: (count) => {
        this.totalDestaques.set(count);
      },
      error: (err) => {
        console.error('Erro ao carregar total de destaques:', err);
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : 'toast-info'
    });
  }

  openConfirmDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title, message } as ConfirmDialogData,
      panelClass: 'confirm-dialog-panel'
    });
    return dialogRef.afterClosed();
  }

  retry() {
    this.veiculoService.getAll()
    this.veiculoService.loadFiltros()
    this.carregarTotalDestaques()
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  openEditModal(veiculo: VeiculoGetResponse) {
    this.selectedVehicle.set(veiculo);
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedVehicle.set(null);
  }

  createVeiculo(data: VeiculoPostRequest) {
    this.veiculoService.create(data).subscribe({
      next: (response: VeiculoPostResponse) => {
        this.veiculoService.getAll();
        this.carregarTotalDestaques();
        this.closeModal();
        this.showToast('Veículo criado com sucesso!', 'success');
      },
      error: (err) => {
        console.error('Erro ao criar veículo:', err);
        this.showToast('Erro ao criar veículo', 'error');
      }
    });
  }

  async updateVeiculo(event: { data: VeiculoPutRequest; imagensParaAdicionar: File[]; imagensParaDeletar: number[] }) {
    this.openConfirmDialog('Atualizar Veículo', 'Deseja realmente salvar as alterações?').subscribe(async (confirmed) => {
      if (confirmed) {
        this.veiculoService.update(event.data).subscribe({
          next: async () => {
            for (const imagemId of event.imagensParaDeletar) {
              await this.veiculoService.deleteImagem(event.data.id, imagemId).toPromise()
            }

            if (event.imagensParaAdicionar.length > 0) {
              await this.veiculoService.addImagens(event.data.id, event.imagensParaAdicionar).toPromise()
            }

            this.veiculoService.getAll();
            this.carregarTotalDestaques();
            this.closeEditModal();
            this.showToast('Veículo atualizado com sucesso!', 'success');
          },
          error: (err) => {
            console.error('Erro ao atualizar veículo:', err);
            this.showToast('Erro ao atualizar veículo', 'error');
          }
        });
      }
    });
  }

  toggleDestaque(veiculo: VeiculoGetResponse, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const wasChecked = veiculo.destaque;

    veiculo.destaque = checked;

    this.veiculoService.toggleDestaque(veiculo.id, checked).subscribe({
      next: () => {
        const incremento = checked !== wasChecked ? (checked ? 1 : -1) : 0;
        this.totalDestaques.update(current => current + incremento);
        this.showToast('Destaque atualizado com sucesso!', 'success');
      },
      error: (err) => {
        console.error('Erro ao alterar destaque:', err);
        veiculo.destaque = wasChecked;
        (event.target as HTMLInputElement).checked = wasChecked;
        this.showToast('Erro ao alterar destaque', 'error');
      }
    });
  }

  deleteVeiculo(veiculo: VeiculoGetResponse) {
    this.openConfirmDialog('Excluir Veículo', `Deseja realmente excluir ${veiculo.marca} ${veiculo.modelo}?`).subscribe((confirmed) => {
      if (confirmed) {
        this.veiculoService.delete(veiculo.id).subscribe({
          next: () => {
            this.veiculoService.getAll();
            this.carregarTotalDestaques();
            this.showToast('Veículo excluído com sucesso!', 'success');
          },
          error: (err) => {
            console.error('Erro ao excluir veículo:', err);
            this.showToast('Erro ao excluir veículo', 'error');
          }
        });
      }
    });
  }

  

  
}