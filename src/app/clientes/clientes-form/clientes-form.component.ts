import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    //retorna um observable que possui o subscribe
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe(
      urlParams => {
        this.id = urlParams['id'];
        this.service
        .getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        );
       }
    )
  }

  onSubmit() {
    if (this.cliente.id != undefined) {
      this.service.atualizar(this.cliente).subscribe(
        response => {
          this.errors = [];
          this.success = true;
          this.cliente = response;
        },
        errorResponse => {
          this.success = false;
          this.errors = ['Erro ao atualizar o Cliente'];
        }
      );
    } else {
      this.service.salvar(this.cliente).subscribe(
        response => {
          this.errors = [];
          this.success = true;
          this.cliente = response;
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

  voltar() {
    this.router.navigate(['/clientes-lista']);
  }
}
