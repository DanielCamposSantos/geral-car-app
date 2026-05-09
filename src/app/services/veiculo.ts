import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Page } from '../models/page';
import { VeiculoGetResponse } from '../models/veiculo-get-response';
import { VeiculoFilter } from '../models/veiculo-filter';
import { Filtros } from '../models/filtros';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Veiculo {
  private http = inject(HttpClient);

  private baseUrl = `${environment.API_URL}/veiculos`;

  /*
  =========================
  PAGINAÇÃO
  =========================
  */

  private pageSignal =
    signal<Page<VeiculoGetResponse>>({
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 0
    });

  page =
    this.pageSignal.asReadonly();


  private filtrosSignal =
    signal<Filtros>({
      anos: [],
      combustiveis: []
    });

  filtros =
    this.filtrosSignal.asReadonly();


  loading =
    signal(false);
  error =
    signal<string | null>(null);

  private selectedVehicleSignal =
    signal<VeiculoGetResponse | null>(null);

  selectedVehicle =
    this.selectedVehicleSignal.asReadonly();

  selectVehicle(vehicle: VeiculoGetResponse) {
    this.selectedVehicleSignal.set(vehicle);
  }

  findCachedVehicle(id: number): VeiculoGetResponse | null {
    const selected = this.selectedVehicleSignal();

    if (selected?.id === id) {
      return selected;
    }

    return this.pageSignal().content.find(item => item.id === id) || null;
  }

  getById(id: number): Observable<VeiculoGetResponse> {
    return this.http
      .get<VeiculoGetResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(vehicle => this.selectVehicle(vehicle))
      );
  }

  resolveVehicleById(id: number): Observable<VeiculoGetResponse> {
    const cached = this.findCachedVehicle(id);

    if (cached) {
      return of(cached);
    }

    return this.getById(id);
  }



  getAll(filters?: VeiculoFilter) {

    this.loading.set(true);

    this.error.set(null);

    let params = new HttpParams();

    if (filters) {

      Object.entries(filters)
        .forEach(([key, value]) => {

          if (
            value !== null &&
            value !== undefined &&
            value !== ''
          ) {

            params =
              params.set(key, String(value));

          }

        });

    }

    this.http
      .get<Page<VeiculoGetResponse>>(
        this.baseUrl,
        { params }
      )
      .subscribe({
        next: data => {

          this.pageSignal.set(data);

          this.loading.set(false);

        },

        error: err => {

          console.error(err);

          this.error.set(
            'Erro ao carregar veículos'
          );

          this.loading.set(false);

        }
      });

  }


  loadFiltros() {

    this.http
      .get<Filtros>(
        `${this.baseUrl}/filtros`
      )
      .subscribe({
        next: data => {

          this.filtrosSignal.set(data);

        },

        error: err => {

          console.error(err);

        }
      });

  }

}