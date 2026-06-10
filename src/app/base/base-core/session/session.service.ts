import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNumeric } from '@base-core/function/validation-number';
import { BehaviorSubject } from 'rxjs';
import { JwtToken, JwtTokenEnum } from '../model/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private helpToken = new JwtHelperService();

  private $jwtTokenSubject = new BehaviorSubject<JwtToken>(this.getJwt());
  public $jwtToken = this.$jwtTokenSubject.asObservable();

  private $userPayloadSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(JwtTokenEnum.USER_PAYLOAD)))
  public $userPayload = this.$userPayloadSubject.asObservable();

  private dateExpired: Date;

  constructor() {
  }

  setJwtLocalStorage(jwt: JwtToken) {
    this.dateExpired = new Date();
    this.dateExpired.setUTCSeconds(this.dateExpired.getSeconds() + (jwt.expires_in - 10));

    localStorage.setItem(JwtTokenEnum.DATE_EXPIRED, `${this.dateExpired.valueOf()}`);

    this.$jwtTokenSubject.next(jwt);
    localStorage.setItem(JwtTokenEnum.ACCESS_TOKEN, JSON.stringify(jwt));
    this.$jwtToken.subscribe(jwt => {
      this.setPayloadSession(jwt.access_token);
    });
  }

  private setPayloadSession(jwt: string) {
    this.$userPayloadSubject.next(this.helpToken.decodeToken(jwt));
  }

  getPayload() {
    return this.helpToken.decodeToken(this.getJwt().access_token);
  }

  getJwt(): JwtToken {
    const token = localStorage.getItem(JwtTokenEnum.ACCESS_TOKEN);
    if (token) {
      return JSON.parse(token);
    } else {
      return undefined;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getJwt();
    if (!token) {
      return true;
    }

    const date = this.getTokenExpiration();
    if (date === undefined || date === null || !date) {
      return true;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpiration(): Date {
    const token = this.getJwt();
    if (token.expires_in === undefined) { return null; }
    const dateLocalStorage = localStorage.getItem(JwtTokenEnum.DATE_EXPIRED);
    if (!isNumeric(dateLocalStorage)) { return null; }
    const date: number = Number(dateLocalStorage);
    return new Date(date);
  }

  removeToken() {
    localStorage.setItem(JwtTokenEnum.ACCESS_TOKEN, '');
  }

  removeDateExpired() {
    localStorage.setItem(JwtTokenEnum.DATE_EXPIRED, '');
  }


  addCompanyId(id: string) {

    localStorage.setItem(JwtTokenEnum.COMPANY_ID, id.toString());
  }

  get companyId(): string {
  
    return localStorage.getItem(JwtTokenEnum.COMPANY_ID);
  }
// COMPANY_NAME

addCompanyName(name: string) {

  localStorage.setItem(JwtTokenEnum.COMPANY_NAME, name.toString());
}

get companyName(): string {
  return localStorage.getItem(JwtTokenEnum.COMPANY_NAME);
}


}
