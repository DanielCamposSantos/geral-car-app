import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Observable, tap, of } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Filtros } from "../models/filtros";
import { Page } from "../models/page";
import { VeiculoFilter } from "../models/veiculo-filter";
import { VeiculoGetResponse } from "../models/veiculo-get-response";
import { VeiculoPostRequest } from "../models/veiculo-post-request";
import { VeiculoPostResponse } from "../models/veiculo-post-response";
import { VeiculoPutRequest } from "../models/veiculo-put-request";

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.API_URL}/veiculos`;
  private selectedVehicleSignal = signal<VeiculoGetResponse | null>(null);

  private readonly defaultPage: Page<VeiculoGetResponse> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 6,
  };
  readonly filtros = signal<Filtros>({ marcas: [], modelos: [], anos: [], combustiveis: [] });
  readonly page = signal<Page<VeiculoGetResponse>>(this.defaultPage);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedVehicle = this.selectedVehicleSignal.asReadonly();

  private createParams(filters?: VeiculoFilter): HttpParams {
  let params = new HttpParams();
  if (filters) {
    if (filters.marca && filters.marca !== null) params = params.set('marca', filters.marca);
    if (filters.modelo && filters.modelo !== null) params = params.set('modelo', filters.modelo);
    if (filters.ano !== undefined && filters.ano !== null) params = params.set('ano', String(filters.ano));
    if (filters.combustivel && filters.combustivel !== null) params = params.set('combustivel', filters.combustivel);
  }
  return params;
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

  getAll(filters?: VeiculoFilter, page: number = 0, size: number = 6) {
    this.loading.set(true);
    this.error.set(null);
    let params = this.createParams(filters);
    params = params.set('page', String(page));
    params = params.set('size', String(size));
    this.http.get<Page<VeiculoGetResponse>>(this.baseUrl, { params }).subscribe({
      next: pageData => {
        this.page.set(pageData);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('Não foi possível carregar os veículos');
        this.loading.set(false);
      }

    });
  }

  create(data: VeiculoPostRequest): Observable<VeiculoPostResponse> {
    const formData = new FormData();
    const requestData = {
      marca: data.marca,
      modelo: data.modelo,
      cor: data.cor,
      ano: data.ano,
      quilometragem: data.quilometragem,
      descricao: data.descricao,
      combustivel: data.combustivel,
      destaque: data.destaque
    };
    formData.append('data', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    data.imagens.forEach((imagem: File) => {
      formData.append('images', imagem);
    });
    return this.http.post<VeiculoPostResponse>(this.baseUrl, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(data: VeiculoPutRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, data);
  }

  toggleDestaque(id: number, destaque: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/destaques/${id}?destaque=${destaque}`, {});
  }

  getDestaques(): Observable<VeiculoGetResponse[]> {
    return this.http.get<VeiculoGetResponse[]>(`${this.baseUrl}/destaques`);
  }

  getDestaqueCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/destaques/count`);
  }

  addImagens(veiculoId: number, files: File[]): Observable<void> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return this.http.post<void>(`${this.baseUrl}/${veiculoId}/imagens`, formData);
  }

  deleteImagem(veiculoId: number, imagemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${veiculoId}/imagens?imagemId=${imagemId}`);
  }

  selectVehicle(vehicle: VeiculoGetResponse) {
    this.selectedVehicleSignal.set(vehicle);
  }

  getById(id: number): Observable<VeiculoGetResponse> {
    return this.http.get<VeiculoGetResponse>(`${this.baseUrl}/${id}`)
      .pipe(tap(vehicle => this.selectVehicle(vehicle)));
  }

  findCachedVehicle(id: number): VeiculoGetResponse | null {
    return this.selectedVehicleSignal() ?? this.page().content.find(v => v.id === id) ?? null;
  }

  resolveVehicleById(id: number): Observable<VeiculoGetResponse> {
    const cached = this.findCachedVehicle(id);
    return cached ? of(cached) : this.getById(id);
  }

}