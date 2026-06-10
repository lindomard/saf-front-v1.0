import { Injectable } from '@angular/core';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { Observable } from 'rxjs';
import { DadosCidadesAtravesDoCepRepository } from 'src/app/dados-cidade-atraves-do-cep/domain/repository/dados-cidades-atraves-do-cep-repository';
import { DadosCidadesAtravesDoCepError, DadosCidadesAtravesDoCepSucess, DadosCidadesConjugeLocTraAtravesDoCepError, DadosCidadesConjugeLocTraAtravesDoCepSucess } from 'src/app/dados-cidade-atraves-do-cep/domain/state/dados-cidades-atraves-do-cep-state';

@Injectable()
export class DadosCidadesAtravesDoCepUseCase implements Usecase<string, State>{

    constructor(private dadosCidadesAtravesDoCepRepository: DadosCidadesAtravesDoCepRepository) { }

    execute(cep: string): Observable<State> { 
      return new Observable(obs => { 
          obs.next(new ShowLoading())        
          const subject = this.dadosCidadesAtravesDoCepRepository.getCep(cep) 
          .subscribe( 
              (response) => { 
                  obs.next(new DadosCidadesAtravesDoCepSucess(response)) 
              }, 
              err => { 
                  obs.next(new DadosCidadesAtravesDoCepError( err.error.message)); 
                  obs.next(new HideLoading());

              }, 
              () => {
                obs.next(new HideLoading());
                obs.complete(); 
              }
                
              ); 
              setTimeout(() => {
                obs.next(new HideLoading());
                subject.unsubscribe();
            }, 10000);
      }); 

  } 



  executeLocTraConjuge(cep: string): Observable<State> { 
    return new Observable(obs => { 
        obs.next(new ShowLoading())        
        const subject = this.dadosCidadesAtravesDoCepRepository.getCep(cep) 
        .subscribe( 
            (response) => { 
                obs.next(new DadosCidadesConjugeLocTraAtravesDoCepSucess(response)) 
            }, 
            err => { 
                obs.next(new DadosCidadesConjugeLocTraAtravesDoCepError( err.error.message)); 
                obs.next(new HideLoading());

            }, 
            () => {
              obs.next(new HideLoading());
              obs.complete(); 
            }
              
            ); 
            setTimeout(() => {
              obs.next(new HideLoading());
              subject.unsubscribe();
          }, 10000);
    }); 
} 


} 
