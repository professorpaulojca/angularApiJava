import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servico-prestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';
@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {
  clientes: Cliente[] = [];
  success: boolean = false;
  errors: string[];
  id: number;
  servico: ServicoPrestado;

  constructor(
    private clientesService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clientesService.getClientes()
      .subscribe(response => this.clientes = response);
  }

  onSubmit() {
    this.servicoPrestadoService.salvar(this.servico).subscribe(
      response => {
        this.errors = [];
        this.success = true;
        this.servico = new ServicoPrestado();
      },
      errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      }
    );
  }

}
