import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormValidationErrors, validarForm } from '@base-core/function/validar-forms';
import { attribuiSeVazio, ultimoDiaDoAno } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SnotifyService } from 'ng-snotify';
import { TelaAberturaService } from '../tela-abertura.service';
import { UserEntity } from '@sign/domain/entity/user-entity';
import { JwtToken } from '@base-core/model/jwt-token';
import { safeCall } from '@base-core/safe-call';
import { SessionService } from '@base-core/session/session.service';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { ApresentarMensagemRetornos } from '@base-shared/funcoesGerais/apresentarMensagemRetornos';
import { Response } from '@base-core/model/response.model';
import { CadPessoasModel } from 'src/app/cadcli/model/cadpessoasModel';
import { Router } from '@angular/router';
import { cadastrarPessoaMapper } from './mapper/cadastrar-pessoa-mapper';
import { ItemSelect } from '@base-shared/select/select.component';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  @Output() ativarLogin = new EventEmitter<any>();
  isLoading = false;
  showSenha = false;
  showConfirma = false;
  //  userEntity: UserEntity = {};

    optionCpTipoCodItem: ItemSelect[] = [
        { id: 0, name: 'String' },
        { id: 1, name: 'Numerico' },
    ];


  private cadastrarPessoaMapper = cadastrarPessoaMapper();

  constructor(

    private snotifyService: SnotifyService,
    private telaAberturaService: TelaAberturaService,
    private session: SessionService
    , private router: Router


  ) { }


  form_login: FormGroup = new FormGroup({
    cnpj: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    dtRefIni: new FormControl('', Validators.required),
    dtRefFin: new FormControl('', Validators.required),



    fone: new FormControl('', Validators.required),
    whatsApp: new FormControl('', Validators.required),

    email: new FormControl('', Validators.required),
    cpCodItemPadrao: new FormControl(1, Validators.required),

    nome: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    senhaConfirma: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }



  validar() {
    // inicio

    let mErros: string = "";

    if (this.form_login.valid == false) {
      this.form_login.hasError;
      this.form_login.setValidators;
      mErros = getFormValidationErrors(this.form_login) + "\n";
    }

    if (this.form_login.get("senha") == null || this.form_login.get("senha").value.length < 1) {
      mErros = mErros + "Senha Campo Obrigatório!\n";
    } else if (this.form_login.get("senhaConfirma") == null || this.form_login.get("senhaConfirma").value.length < 1
      || (this.form_login.get("senhaConfirma").value != this.form_login.get("senha").value)
    ) {
      mErros = mErros + "Senha Diferente da Confirmação!\n";

    }


    if (mErros.length > 0) {
      validarForm(this.form_login);
      this.snotifyService.info(mErros);
      return;

    }

    // inicio login

    try {

      this.showLoading();


      let userEntity: UserEntity = {};
      userEntity.company = "0";
      userEntity.password = "123";
      userEntity.username = "Sem Logar";
/*
      this.form.get('company').setValue('0');
      this.form.get('username').setValue('Sem Logar');
      this.form.get('password').setValue('123');
  */
      this.telaAberturaService.login(userEntity).subscribe((jwt: JwtToken) => {
        safeCall(jwt, () => {

          if (jwt) {
            this.session.setJwtLocalStorage(jwt);
            this.session.addCompanyId(userEntity.company);
            this.fCadastrarPessoa();
          }
        })
      }, error => {

        console.log("erro ", error);
        this.snotifyService.error(HttpMensage(error));
        this.hideLoading();

      }



      );
    } catch (error) {
      this.snotifyService.error(HttpMensage(error));
      this.hideLoading();

    } finally {

    }







  }
  fCadastrarPessoa() {




    try {

      this.telaAberturaService.cadastrarPessoa(
        this.cadastrarPessoaMapper.converterFormToModel(this.form_login)
        ).subscribe((response: Response) => {
        safeCall(response, () => {

          if (response.success) {
            let cadpessoasModel: CadPessoasModel = response.objeto[0];
            this.fLogar(cadpessoasModel);
          } else {
            new  ApresentarMensagemRetornos(this.snotifyService,response).apresentarMensagem;
            this.hideLoading();


          }
        })
      }, error => {

        console.log("erro 176", error);
        this.snotifyService.error("176 " +HttpMensage(error));
        this.hideLoading();

      }



      );
    } catch (error) {
      this.snotifyService.error("176 " +HttpMensage(error));
      this.hideLoading();


    } finally {

    }


  }
// inicio

fLogar(cadpessoasModel: CadPessoasModel) {
  // inicio


  // inicio login

  try {


    let userEntity: UserEntity = {};
    userEntity.company = cadpessoasModel.cpId.toString();
    userEntity.password = this.form_login.get("senha").value;
    userEntity.username = this.form_login.get("nome").value;
    this.telaAberturaService.login(userEntity).subscribe((jwt: JwtToken) => {
      safeCall(jwt, () => {

        if (jwt) {
          this.session.setJwtLocalStorage(jwt);
          this.session.addCompanyId(cadpessoasModel.cpId.toString());
          this.router.navigate(['/page/home']);
        }
      })
    }, error => {

      console.log("222 erro ", error);
      this.snotifyService.error("222 " +HttpMensage(error));
    }



    );
  } catch (error) {
    this.snotifyService.error("230 " +HttpMensage(error));

  } finally {
    this.hideLoading();

  }







}

// termino


  fVerificarFone() {


    this.form_login.get("whatsApp").setValue(
      attribuiSeVazio(this.form_login.get("fone").value, this.form_login.get("whatsApp").value));


  }

  fVerificarData() {
    this.form_login.get("dtRefFin").setValue(
      attribuiSeVazio(ultimoDiaDoAno(this.form_login.get("dtRefIni").value), this.form_login.get("dtRefFin").value));


  }



  fAtivarLogin() {
    this.ativarLogin.emit();

  }



}
