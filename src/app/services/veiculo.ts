import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable, of, tap } from "rxjs";
import { Filtros } from "../models/filtros";
import { Page } from "../models/page";
import { VeiculoFilter } from "../models/veiculo-filter";
import { VeiculoGetResponse } from "../models/veiculo-get-response";


@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.API_URL}/veiculos`;

  private readonly defaultPage: Page<VeiculoGetResponse> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
  };

  readonly filtros = signal<Filtros>({ anos: [], combustiveis: [] });
  readonly page = signal<Page<VeiculoGetResponse>>(this.defaultPage);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private selectedVehicleSignal = signal<VeiculoGetResponse | null>(null);
  readonly selectedVehicle = this.selectedVehicleSignal.asReadonly();

  private createParams(filters?: VeiculoFilter): HttpParams {
    return Object.entries(filters ?? {}).reduce((params, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        return params.set(key, String(value));
      }
      return params;
    }, new HttpParams());
  }

  loadFiltros() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Filtros>(`${this.baseUrl}/filtros`).subscribe({
      next: filtros => {
        this.filtros.set(filtros);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('Não foi possível carregar os filtros');
        this.loading.set(false);
      }
    });
  }

  getAll(filters?: VeiculoFilter) {
    this.loading.set(true);
    this.error.set(null);

    const params = this.createParams(filters);

    this.http.get<Page<VeiculoGetResponse>>(this.baseUrl, { params }).subscribe({
      next: page => {
        this.page.set(page);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('Não foi possível carregar os veículos');
        this.loading.set(false);
      }
    });
  }

  search(filters: VeiculoFilter) {
    this.getAll(filters);
  }

  selectVehicle(vehicle: VeiculoGetResponse) {
    this.selectedVehicleSignal.set(vehicle);
  }

  getById(id: number): Observable<VeiculoGetResponse> {
    return this.http.get<VeiculoGetResponse>(`${this.baseUrl}/${id}`)
      .pipe(tap(vehicle => this.selectVehicle(vehicle)));
  }

  
  findCachedVehicle(id: number): VeiculoGetResponse | null {
    return this.selectedVehicleSignal() ?? 
           this.page().content.find(v => v.id === id) ?? null;
  }

  resolveVehicleById(id: number): Observable<VeiculoGetResponse> {
    const cached = this.findCachedVehicle(id);
    return cached ? of(cached) : this.getById(id);
  }
}