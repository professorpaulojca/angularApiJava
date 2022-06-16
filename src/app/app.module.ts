import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientesModule } from './clientes/clientes.module';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';

import { ClientesService } from './clientes.service';
import { ServicoPrestadoService } from './servico-prestado.service';
import { registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicoPrestadoModule
  ],
  providers: [
    ClientesService,
    ServicoPrestadoService,
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
