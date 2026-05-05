import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/Page';
import { VeiculoGetResponse } from '../models/VeiculoGetResponse';

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

  load(){
    this.http.get<Page<VeiculoGetResponse>>(this.baseUrl)
      .subscribe(data => this.pageSignal.set(data))
  }






}
