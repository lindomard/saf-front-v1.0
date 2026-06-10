import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DadosCidadesAtravesDoCepRepositoryService } from 'src/app/dados-cidade-atraves-do-cep/data/repository/dados-cidades-atraves-do-cep-repository-service';
import { DadosCidadesAtravesDoCepRepository } from 'src/app/dados-cidade-atraves-do-cep/domain/repository/dados-cidades-atraves-do-cep-repository';
import { DadosCidadesAtravesDoCepUseCase } from 'src/app/dados-cidade-atraves-do-cep/domain/use-case/dados-cidades-atraves-do-cep-usecase';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

  providers: [
    DadosCidadesAtravesDoCepUseCase,
    { provide:  DadosCidadesAtravesDoCepRepository, useClass: DadosCidadesAtravesDoCepRepositoryService }
  ]
})



export class DadosCidadesAtravesDoCepModule { }
