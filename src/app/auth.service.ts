import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiUrlBase + 'api/usuarios';
  tokenURL: string = environment.apiUrlBase + environment.obterTokenURrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken() {

    const tokenString: string = localStorage.getItem('accessToken');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('accessToken');
  }

  getUsuarioAutenticado(): string {
    const token = this.obterToken();
    if (token) {
      const usuario: string = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

  isAuthenticated(): boolean {

    const token = this.obterToken();

    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers });

  }
}
