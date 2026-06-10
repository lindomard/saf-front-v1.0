import {UserEntity} from '../entity/user-entity';
import {Observable} from 'rxjs';
import {SessionService} from 'src/app/base/base-core/session/session.service';
import {State, ShowLoading, HideLoading} from 'src/app/base/base-core/state/state';
import {SuccessState, ErroState} from '../state/state-sign';
import {HttpErrorResponse} from '@angular/common/http';
import {UntypedFormGroup} from '@angular/forms';
import {JwtToken} from 'src/app/base/base-core/model/jwt-token';
import {Usecase} from 'src/app/base/base-core/usecase';
import {SignInRepository} from '../repositories/sign-in-repository';
import {instanceSignInMapper} from '../mapper/sign-in-mapper';
import {Injectable} from '@angular/core';

@Injectable()
export class SignUsecase implements Usecase<UntypedFormGroup, State> {

  constructor(
    private signRepository: SignInRepository,
    private session: SessionService
  ) {
  }

  private signInMapper = instanceSignInMapper();

  execute(form: UntypedFormGroup): Observable<State> {
    if (form.invalid) {
      return Observable.create(obs => {
        obs.next(new ErroState('Usuário invalido!'));
        obs.complete();
      });
    }

    const useEntity: UserEntity = form.getRawValue();
    const body = this.signInMapper.mapFrom(useEntity);
    return Observable.create(observable => {
      observable.next(new ShowLoading());
      const subscriber = this.signRepository.signIn(body)
        .subscribe(
          (jwt: JwtToken) => {
            this.session.setJwtLocalStorage(jwt);
            this.session.addCompanyId(useEntity.company);
            observable.next(new SuccessState(jwt));
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              observable.next(new ErroState(this.fillError(err)));
            }
            observable.next(new HideLoading());
          },
          () => {
            observable.next(new HideLoading());
            observable.complete();
          }
        );
      return () => {
        observable.next(new HideLoading());
        subscriber.unsubscribe();
      };
    });
  }


  private fillError(err): string {
    let error: string;
    switch (err.status) {
      case 400: {
        error = ('Usuário ou senha invalido.');
        break;
      }
      case 401: {
        error = ('Usuário ou senha invalido.');
        break;
      }
      default: {
        error = ('Erro inesperado!');
        break;
      }
    }
    return error;
  }
}
