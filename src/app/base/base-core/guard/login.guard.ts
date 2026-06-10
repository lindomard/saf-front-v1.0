import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from '../session/session.service';
import {Observable} from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.session.isTokenExpired()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

