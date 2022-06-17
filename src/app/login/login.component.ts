import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso : string;
  errors: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('accessToken');
  }

  onSubmit(){

    this.authService.tentarLogar(this.username, this.password)
    .subscribe(
      response => {
        const accessToken = JSON.stringify(response);
        localStorage.setItem('accessToken', accessToken);
        console.log(response);
        this.router.navigate(['/home']);
      }
      ,
      error => {
        this.loginError = true;
        this.mensagemSucesso = null;
        this.errors = ['Usuário ou senha inválidos'];
      }

    );
  }

  preparaCadastrar(event){
    event.preventDefault(); //evita o comportamento padrão do formulário
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
    this.loginError = false;
    this.mensagemSucesso = null;
  }

  cadastrar(){
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
    .salvar(usuario)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Usuário cadastrado com sucesso! Efetue o login.';
        this.loginError = false;
        this.errors = [];
        this.cadastrando = false;
        this.username = '';
        this.password = '';

      },
      errorResponse => {
        this.loginError = true;
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      }
    )

  }


}
