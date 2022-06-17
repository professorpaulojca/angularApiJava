import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;

  constructor(
    private router: Router
  ) { }

  onSubmit(){
    this.router.navigate(['/home']);
    console.log(`User: ${this.username}, Password: ${this.password}`);
  }

  preparaCadastrar(event){
    event.preventDefault(); //evita o comportamento padrão do formulário
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }



}
