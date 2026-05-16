import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Filtros } from "../models/filtros";
import { Page } from "../models/Page";
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

  private handleError(error: unknown): Observable<never> {
    console.error('VeiculoService error', error);
    return throwError(() => new Error('Erro ao comunicar com o servidor.'));
  }

  private safeRequest<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(catchError((error) => this.handleError(error)));
  }

  loadFiltros(): Observable<Filtros> {
    return this.safeRequest(this.http.get<Filtros>(`${this.baseUrl}/filtros`));
  }

  getAll(filters?: VeiculoFilter, page: number = 0, size: number = 6): Observable<Page<VeiculoGetResponse>> {
    let params = this.createParams(filters);
    params = params.set('page', String(page));
    params = params.set('size', String(size));
    return this.safeRequest(this.http.get<Page<VeiculoGetResponse>>(this.baseUrl, { params }));
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
    return this.safeRequest(this.http.post<VeiculoPostResponse>(this.baseUrl, formData));
  }

  delete(id: number): Observable<void> {
    return this.safeRequest(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }

  update(data: VeiculoPutRequest): Observable<void> {
    return this.safeRequest(this.http.put<void>(`${this.baseUrl}`, data));
  }

  toggleDestaque(id: number, destaque: boolean): Observable<void> {
    return this.safeRequest(this.http.patch<void>(`${this.baseUrl}/destaques/${id}?destaque=${destaque}`, {}));
  }

  getDestaques(): Observable<VeiculoGetResponse[]> {
    return this.safeRequest(this.http.get<VeiculoGetResponse[]>(`${this.baseUrl}/destaques`));
  }

  getDestaqueCount(): Observable<number> {
    return this.safeRequest(this.http.get<number>(`${this.baseUrl}/destaques/count`));
  }

  addImagens(veiculoId: number, files: File[]): Observable<void> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return this.safeRequest(this.http.post<void>(`${this.baseUrl}/${veiculoId}/imagens`, formData));
  }

  deleteImagem(veiculoId: number, imagemId: number): Observable<void> {
    return this.safeRequest(this.http.delete<void>(`${this.baseUrl}/${veiculoId}/imagens?imagemId=${imagemId}`));
  }

  getById(id: number): Observable<VeiculoGetResponse> {
    return this.safeRequest(this.http.get<VeiculoGetResponse>(`${this.baseUrl}/${id}`));
  }

}