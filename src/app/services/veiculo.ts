import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../models/Page';
import { VeiculoGetResponse } from '../models/VeiculoGetResponse';
import { VeiculoFilter } from '../models/VeiculoFilter';

@Injectable({
  providedIn: 'root',
})
export class Veiculo {
  http = inject(HttpClient)
  private baseUrl = `${environment.API_URL}/veiculos`

  private pageSignal = signal<Page<VeiculoGetResponse>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0
  });

  page = this.pageSignal.asReadonly()

  getAll(filters?: VeiculoFilter) {
    let params = new HttpParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params = params.set(key, value)
        }
      })
    }

    this.http.get<Page<VeiculoGetResponse>>(this.baseUrl, { params })
      .subscribe(data => this.pageSignal.set(data))
  }






}
