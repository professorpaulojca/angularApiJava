import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servico-prestado'
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  servicos: ServicoPrestado[] = [];
  servico: ServicoPrestado;
  servicoSelecionado: ServicoPrestado;
  mensagemSucesso: String;
  mensagemErro: String;


  constructor(private service: ServicoPrestadoService, private router: Router) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
  }

  //quando clica no botão novo
  novoCadastro() {
    this.router.navigate(['/servico-prestado-form']);
  }

  preparaDelecao(servico: ServicoPrestado) {
    this.servicoSelecionado = servico;
  }

  deletar() {
    console.log(this.servicoSelecionado)
  }

  pesquisar(){
    console.log(this.mes + " " + this.nome);
  }

}
