import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TelaAberturaService } from '../tela-abertura.service';
import { safeCall } from '@base-core/safe-call';
import { SessionService } from '@base-core/session/session.service';
import { JwtToken } from '@base-core/model/jwt-token';
import { SnotifyService } from 'ng-snotify';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @Output() ativarCadastro = new EventEmitter<any>();
  isLoading = false;
  showPass = false;

  togglePass() {
    this.showPass = !this.showPass;
  }

  constructor(
    private telaAberturaService: TelaAberturaService
    , private session: SessionService
    , private snotify: SnotifyService
    , private router: Router



  ) { }

  form_login: FormGroup = new FormGroup({
    company: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.form_login.get('company').setValue('81');
    this.form_login.get('username').setValue('lindomar');
    this.form_login.get('password').setValue('123');

  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  validar() {


    try {

      this.showLoading();



      this.telaAberturaService.login(this.form_login.value).subscribe((jwt: JwtToken) => {
        safeCall(jwt, () => {

          if (jwt) {
            this.session.setJwtLocalStorage(jwt);
            this.session.addCompanyId(this.form_login.get("company").value);
            this.router.navigate(['/page/home']);
          }
        })
      }, error => {

        console.log("erro ", error);
        this.snotify.error(HttpMensage(error));
      }



      );
    } catch (error) {
      this.snotify.error(HttpMensage(error));

    } finally {
      this.hideLoading();

    }

  }



naoTenhoCadastro() {
  this.ativarCadastro.emit();
  console.log('vai ativar cadastrar');

}  

setMyStyle() {
  let styles = {
    'background':'#eb01a5',
    'background-image': 'url("https://getsatisfaction.com/corp/img/product/five_obstacles.png"), repeating-linear-gradient(45deg,#606dbc,#606dbc 10px,#465298 10px,#465298 20px)',
    'background-repeat':'no-repeat'
  };
  return styles;
}
}
