import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servico-prestado'
import { Router } from '@angular/router';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[] = [];
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
    this.service.buscar(this.nome, this.mes)
    .subscribe(response => {
      this.lista = response;
      if (this.lista.length <= 0){
        this.mensagemErro = "Nenhum registro encontrado";
      } else {
        this.mensagemErro = null;
      }
    }
    );
  }
}
