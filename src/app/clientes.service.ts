import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL : string = environment.apiUrlBase + 'api/clientes';

  constructor(private http: HttpClient) {

  }

  //para não repetir o código do headers em todos os métodos
  //foi criado um interceptador para adicionar o token no header

  salvar(cliente: Cliente) : Observable<Cliente>{
    console.log(cliente);

    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  getClientes() : Observable<Cliente[]>{
    const token = JSON.parse(localStorage.getItem('accessToken')).access_token;
    const headers = {
      'Authorization': 'Bearer ' + token
    }
    return this.http.get<Cliente[]>(`${this.apiURL}`);

  }

  getClienteById(id:number) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiURL}/${id}`);

  }

  atualizar(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}`, cliente);

  }

  deletar(cliente: Cliente) : Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);

  }


}
