import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DadosPessoasAtravesDoCnpjRepositoryService } from 'src/app/dados-pessoas-atraves-do-cnpj/data/repository/dados-pessoas-atraves-do-cnpj-repository-service';
import { DadosPessoasAtravesDoCnpjRepository } from 'src/app/dados-pessoas-atraves-do-cnpj/domain/repository/dados-pessoas-atraves-do-cnpj-repository';
import { DadosPessoasAtravesDoCnpjUseCase } from 'src/app/dados-pessoas-atraves-do-cnpj/domain/use-case/dados-pessoas-atraves-do-cnpj-usecase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

  providers: [
    DadosPessoasAtravesDoCnpjUseCase,
    { provide:  DadosPessoasAtravesDoCnpjRepository, useClass: DadosPessoasAtravesDoCnpjRepositoryService }
  ]
})



export class DadosPessoasAtravesDoCnpjModule { }
