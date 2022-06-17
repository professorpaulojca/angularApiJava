import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: String;
  mensagemErro: String;

  //injeção de dependência
  constructor(private service: ClientesService, private router: Router) {}

  //método executado quando o componente é inicializado
  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((response) => (this.clientes = response));
  }

  //quando clica no botão novo
  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletar() {
    this.service.deletar(this.clienteSelecionado)
    .subscribe((response) => {
      this.mensagemSucesso = 'Cliente deletado com sucesso!';
      this.ngOnInit();
    }),
      erro => this.mensagemErro = 'Erro ao deletar o cliente!';

  }
}
