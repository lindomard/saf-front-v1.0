import { Injectable } from '@angular/core';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { Observable } from 'rxjs';
import { DadosPessoasAtravesDoCnpjRepository } from 'src/app/dados-pessoas-atraves-do-cnpj/domain/repository/dados-pessoas-atraves-do-cnpj-repository';
import { DadosPessoasAtravesDoCnpjError, DadosPessoasAtravesDoCnpjSucess } from 'src/app/dados-pessoas-atraves-do-cnpj/domain/state/dados-pessoas-atraves-do-cnpj-state';

@Injectable()
export class DadosPessoasAtravesDoCnpjUseCase implements Usecase<string, State>{

    constructor(private dadosPessoasAtravesDoCnpjRepository: DadosPessoasAtravesDoCnpjRepository) { }

    execute(cnpj: string): Observable<State> { 
        return new Observable(obs => { 
          obs.next(new ShowLoading())        

            const subscriber = this.dadosPessoasAtravesDoCnpjRepository.getCnpj(cnpj) 
            .subscribe( 
                (response) => { 
                    obs.next(new DadosPessoasAtravesDoCnpjSucess(response)) 
                }, 
                err => { 
                    obs.next(new DadosPessoasAtravesDoCnpjError( JSON.stringify(err.error.message))); 
                    obs.next(new HideLoading());

                }, 

                
                () => {
                  obs.next(new HideLoading());
                  obs.complete() 
                }
                ); 
                
                setTimeout(() => {
                  obs.next(new HideLoading());
                  subscriber.unsubscribe();
              }, 10000);
  
              }); 
    } 
} 
 
