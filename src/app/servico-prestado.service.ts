import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL : string = environment.apiUrlBase + 'api/servico-prestado';

  constructor(private http: HttpClient) { }

  salvar(servico: ServicoPrestado) : Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servico);
  }

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]>{
    let httpParams = new HttpParams();
    if (!nome){
      nome = '';
    }
    httpParams = httpParams.set('nome', nome);
    if (mes){
      httpParams = httpParams.set('mes', mes.toString());
    }

    const url = this.apiURL + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }
}
