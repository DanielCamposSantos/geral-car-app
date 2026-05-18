import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Observable } from "rxjs";
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

  private createParams(filters?: VeiculoFilter): HttpParams {
    let params = new HttpParams();
    if (filters) {
      if (filters.marca) params = params.set('marca', filters.marca);
      if (filters.modelo) params = params.set('modelo', filters.modelo);
      if (filters.ano !== undefined && filters.ano !== null) params = params.set('ano', String(filters.ano));
      if (filters.combustivel) params = params.set('combustivel', filters.combustivel);
    }
    return params;
  }

  loadFiltros(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Filtros>(`${this.baseUrl}/filtros`).subscribe({
      next: (filtros) => {
        this.filtros.set(filtros);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os filtros');
        this.loading.set(false);
      }
    });
  }

  getAll(filters?: VeiculoFilter, page: number = 0, size: number = 6): void {
    this.loading.set(true);
    this.error.set(null);

    let params = this.createParams(filters);
    params = params.set('page', String(page));
    params = params.set('size', String(size));

    this.http.get<Page<VeiculoGetResponse>>(`${this.baseUrl}/paginated`, { params }).subscribe({
      next: (pageData) => {
        this.page.set(pageData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os veículos');
        this.loading.set(false);
      }
    });
  }

  getAllFullList(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<VeiculoGetResponse[]>(this.baseUrl).subscribe({
      next: (veiculos) => {
        this.page.set({
          content: veiculos,
          totalElements: veiculos.length,
          totalPages: 1,
          number: 0,
          size: veiculos.length,
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar todos os veículos');
        this.loading.set(false);
      }
    });
  }

  getById(id: number): Observable<VeiculoGetResponse> {
    return this.http.get<VeiculoGetResponse>(`${this.baseUrl}/${id}`);
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
  console.log('Enviando PUT:', JSON.stringify(data)); // Debug
  console.log('URL:', this.baseUrl); // Debug
  
  return this.http.put<void>(this.baseUrl, data);
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
}