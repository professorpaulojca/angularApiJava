import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL : string = environment.apiUrlBase + 'api/servico-prestado';

  constructor(private http: HttpClient) { }

  salvar(servico: ServicoPrestado) : Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servico);
  }
}
