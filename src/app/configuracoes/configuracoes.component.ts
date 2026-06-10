import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { getFormValidationErrors, validarForm } from '@base-core/function/validar-forms';
import { SnotifyService } from 'ng-snotify';
import { CadfilpadModel } from './model/CadfilpadModel';
import { ConfiguracoesService } from './configuracoes.service';
import { safeCall } from '@base-core/safe-call';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { SessionService } from '@base-core/session/session.service';
import { WhatsAppEnviarTextoRequestModel } from './model/WhatsAppEnviarTextoRequestModel';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { MatDialog } from '@angular/material/dialog';
import { WhatsAppQrCodeModalComponent } from './whats-app-qr-code-modal/whats-app-qr-code-modal.component';
import { WhatsAppEnviarArquivoModalComponent } from './whats-app-enviar-arquivo-model/whats-app-enviar-arquivo-modal.component';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder

    , private snotifyService: SnotifyService
    , private configuracoesService: ConfiguracoesService
    , private router: Router

    , private session: SessionService
    , public dialog: MatDialog

  ) { }

  mBuscandoQrCode: boolean = false;
  mEnviandoArquivo: boolean = false;
  stringQrCode: string = "teste";

  isLoading = false;
  mSessionId = "saf10"
  mTipoOperacao = "Parametros"
  cadfilpadModel: CadfilpadModel[] = [];
  idPessoa: any = -1;

  public formulario: UntypedFormGroup;


  ngOnInit(): void {

    this.idPessoa = this.session.companyId;
    this.mTipoOperacao = "Parametros. Id Pessoa " + this.idPessoa;

    this.inicializarForm();




  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  cancelarESair() {
    this.router.navigate(['/page/home']);

  }



  salvar() {
    // Lógica para navegar para a pessoa anterior
    let mErros: string = "";

    if (this.formulario.valid == false) {
      this.formulario.hasError;
      this.formulario.setValidators;
      mErros = getFormValidationErrors(this.formulario) + "\n";
    }
    if (mErros.length > 1) {
      console.log('tamanho merror ', mErros.length, 'conteudo ', mErros)
      validarForm(this.formulario);
      this.snotifyService.error(mErros);

    } else {

      this.cadfilpadModel = [];

      let cadfilpadModel1: CadfilpadModel = {};
      cadfilpadModel1.fpcodusr = this.formulario.get("servidorWhatsAppCodUsr").value;
      cadfilpadModel1.fpvalor = this.formulario.get("servidorWhatsAppValor").value;
      cadfilpadModel1.fpcodusr = this.formulario.get("servidorWhatsAppCodUsr").value;
      cadfilpadModel1.fpcomp = this.formulario.get("servidorWhatsAppComp").value;
      cadfilpadModel1.fpid = this.formulario.get("servidorWhatsAppId").value;
      cadfilpadModel1.fpidPessoa = this.formulario.get("servidorWhatsAppIdPessoa").value;
      cadfilpadModel1.fpnome = this.formulario.get("servidorWhatsAppNome").value;
      this.cadfilpadModel.push(cadfilpadModel1);



      let cadfilpadModel2: CadfilpadModel = {};
      cadfilpadModel2.fpcodusr = this.formulario.get("numeroWhatsAppCodUsr").value;
      cadfilpadModel2.fpvalor = this.formulario.get("numeroWhatsAppValor").value;
      cadfilpadModel2.fpcodusr = this.formulario.get("numeroWhatsAppCodUsr").value;
      cadfilpadModel2.fpcomp = this.formulario.get("numeroWhatsAppComp").value;
      cadfilpadModel2.fpid = this.formulario.get("numeroWhatsAppId").value;
      cadfilpadModel2.fpidPessoa = this.formulario.get("numeroWhatsAppIdPessoa").value;
      cadfilpadModel2.fpnome = this.formulario.get("numeroWhatsAppNome").value;
      this.cadfilpadModel.push(cadfilpadModel2);



      try {

        this.showLoading();



        this.configuracoesService.CadfilpadSalvarAll(this.cadfilpadModel).subscribe((Response) => {
          safeCall(Response, () => {

            if (Response.success) {
              this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);

              this.cancelarESair();

            }
          })
        }, error => {
          this.snotifyService.error(error.error.message);
        }



        );
      } catch (error) {
        this.snotifyService.error(error);

      } finally {
        this.hideLoading();

      }
    }

  }

  inicializarForm() {

    this.formulario = this.fb.group({
      servidorWhatsAppValor: ['', [Validators.required, Validators.maxLength(100)]],
      servidorWhatsAppCodUsr: [0],
      servidorWhatsAppComp: [''],
      servidorWhatsAppId: [0],
      servidorWhatsAppIdPessoa: [0],
      servidorWhatsAppNome: [0],

      numeroWhatsAppValor: ['', [Validators.required, Validators.maxLength(100)]],
      numeroWhatsAppCodUsr: [0],
      numeroWhatsAppComp: [''],
      numeroWhatsAppId: [0],
      numeroWhatsAppIdPessoa: [0],
      numeroWhatsAppNome: [0],
      textoMensagem: [''],
      foneMensagem: ['(62) 99653-7196'],
      foneMensagemTratado: ['(62) 9653-7196'],
      resultados: [''],


    });

    this.carregarCadfilpad();
  }


  carregarCadfilpad() {

    // inicio

    this.cadfilpadModel = [];

    // inicio

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    this.showLoading();

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "fpcodusr", "=", "0",0,"").adicionarfiltros();
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "fpidPessoa", "=", "0",0,"").adicionarfiltros();
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "fpcomp", "=", "whatsApp",0,"").adicionarfiltros();

    let parametrosDados : ParametrosDados= {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;

    this.configuracoesService.CadfilpadGetList(parametrosDados).subscribe((CadfilpadModel) => {
      this.adicionarFilpad(CadfilpadModel);
      this.hideLoading();
    }, error => {
      this.hideLoading();

      this.snotifyService.error(error.error.message);
    }
    )

    // termino

  }

  adicionarFilpad(cadfilpadModel: CadfilpadModel[]) {


    this.formulario.get("servidorWhatsAppCodUsr").setValue(0);
    this.formulario.get("servidorWhatsAppValor").setValue("localhost");
    this.formulario.get("servidorWhatsAppCodUsr").setValue(0);
    this.formulario.get("servidorWhatsAppComp").setValue("whatsApp");
    this.formulario.get("servidorWhatsAppId").setValue(0);
    this.formulario.get("servidorWhatsAppIdPessoa").setValue(0);
    this.formulario.get("servidorWhatsAppNome").setValue("whatsAppEndIp");

    // numero fone

    this.formulario.get("numeroWhatsAppCodUsr").setValue(0);
    this.formulario.get("numeroWhatsAppValor").setValue("localhost");
    this.formulario.get("numeroWhatsAppCodUsr").setValue(0);
    this.formulario.get("numeroWhatsAppComp").setValue("whatsApp");
    this.formulario.get("numeroWhatsAppId").setValue(0);
    this.formulario.get("numeroWhatsAppIdPessoa").setValue(0);
    this.formulario.get("numeroWhatsAppNome").setValue("whatsAppNumero");

    if (cadfilpadModel == null || cadfilpadModel.length <= 0) {
      console.log('entrou no nulo');



    } else {

      cadfilpadModel.forEach(filpad => {
        switch (filpad.fpnome) {
          case "whatsAppEndIp": {
            this.formulario.get("servidorWhatsAppCodUsr").setValue(filpad.fpcodusr);
            this.formulario.get("servidorWhatsAppValor").setValue(filpad.fpvalor);
            this.formulario.get("servidorWhatsAppCodUsr").setValue(filpad.fpcodusr);
            this.formulario.get("servidorWhatsAppComp").setValue(filpad.fpcomp);
            this.formulario.get("servidorWhatsAppId").setValue(filpad.fpid);
            this.formulario.get("servidorWhatsAppIdPessoa").setValue(filpad.fpidPessoa);
            this.formulario.get("servidorWhatsAppNome").setValue(filpad.fpnome);
            break;
          }
          case "whatsAppNumero": {
            this.formulario.get("numeroWhatsAppCodUsr").setValue(filpad.fpcodusr);
            this.formulario.get("numeroWhatsAppValor").setValue(filpad.fpvalor);
            this.formulario.get("numeroWhatsAppCodUsr").setValue(filpad.fpcodusr);
            this.formulario.get("numeroWhatsAppComp").setValue(filpad.fpcomp);
            this.formulario.get("numeroWhatsAppId").setValue(filpad.fpid);
            this.formulario.get("numeroWhatsAppIdPessoa").setValue(filpad.fpidPessoa);
            this.formulario.get("numeroWhatsAppNome").setValue(filpad.fpnome);
            break;
          }

        }
      });
    }

  }


  tratarFoneParaWhatsApp() {


    let mFone: string = this.formulario.get("foneMensagem").value;

    mFone = FuncoesGerais.soNumero(mFone);
    console.log('no inicio tamanhoa ', mFone.length);
    if (mFone.length < 9) {
      mFone = "62" + mFone;
    }


    if (mFone.length == 11) {
      mFone = mFone.substring(0, 2) + mFone.substring(3, mFone.length);
    }

    this.formulario.get("foneMensagemTratado").setValue(mFone);





  }

  whatsAppFecharSessao() {


    try {
      this.showLoading();

      this.configuracoesService.WhatsAppTerminarSession(this.mSessionId).subscribe((WhatsAppResponseModel) => {
        safeCall(WhatsAppResponseModel, () => {
          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppResponseModel));

          if (WhatsAppResponseModel.success) {
            this.snotifyService.info("Sessão Fechada com Sucesso!");
          } else {
            this.snotifyService.info("Erro ao Fechar Sessão!" + WhatsAppResponseModel.message);

          }

        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.hideLoading();

    }
  }

  //inicio

  whatsAppStatusSessao() {


    try {
      this.showLoading();

      this.configuracoesService.WhatsAppStatusSession(this.mSessionId).subscribe((WhatsAppResponseModel) => {
        safeCall(WhatsAppResponseModel, () => {

          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppResponseModel));
          if (WhatsAppResponseModel.success) {
            this.snotifyService.info("Status da Sessão " + WhatsAppResponseModel.message);

          } else {
            this.snotifyService.info("Erro ao Verificar Status da Sessão!" + WhatsAppResponseModel.message);

          }

        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.hideLoading();

    }
  }


  // termino


  //inicio

  whatsAppStartSessao() {


    try {
      this.showLoading();

      this.configuracoesService.WhatsAppStartSession(this.mSessionId).subscribe((WhatsAppResponseModel) => {
        safeCall(WhatsAppResponseModel, () => {

          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppResponseModel));

          if (WhatsAppResponseModel.success) {
            this.snotifyService.info("Sessão Inicializada com sucesso " + WhatsAppResponseModel.message);
          } else {
            this.snotifyService.info("Erro ao inicializar a Sessão!" + WhatsAppResponseModel.message);

          }

        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.hideLoading();

    }
  }
  // inicio

  whatsAppQrCode() {
    this.showLoading();

    this.mBuscandoQrCode = true;

    try {

      this.configuracoesService.WhatsAppQrCodeText(this.mSessionId).subscribe((WhatsAppQrCodeTextResponseModel) => {
        safeCall(WhatsAppQrCodeTextResponseModel, () => {

          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppQrCodeTextResponseModel));

          if (WhatsAppQrCodeTextResponseModel.success) {
            this.snotifyService.info("QrCode Gerado com sucesso " + WhatsAppQrCodeTextResponseModel.qr);
            this.hideLoading();
            this.fAbrirAbaQrCode(this.mSessionId, WhatsAppQrCodeTextResponseModel.qr);
      
          } else {
            this.mBuscandoQrCode=false;
            this.hideLoading();

            this.snotifyService.info("Erro ao Gerar QrCode!" + WhatsAppQrCodeTextResponseModel.qr);

          }

        })
      }, error => {
        this.mBuscandoQrCode=false;
        this.hideLoading();

        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.mBuscandoQrCode=false;
      this.hideLoading();

      this.snotifyService.error(error);

    } finally {

    }


  }


  // termino


  whatsAppEnviarTexto() {


    try {
      this.showLoading();
      let mTexto: string = this.formulario.get("textoMensagem").value;
      if (mTexto.length < 1) {
        this.snotifyService.warning("Favor digitar uma mensagem!");
        return;
      }
      let mFoneDest: string = this.formulario.get("foneMensagemTratado").value;
      if (mFoneDest.length < 1) {
        this.snotifyService.warning("Favor digitar o numero do WhatsApp de Destino!");
        return;
      }

      let whatsAppEnviarTextoRequestModel: WhatsAppEnviarTextoRequestModel = {};
      whatsAppEnviarTextoRequestModel.chatId = mFoneDest;
      whatsAppEnviarTextoRequestModel.contentType = "string";
      whatsAppEnviarTextoRequestModel.content = mTexto;

      this.configuracoesService.WhatsAppSendMessage(this.mSessionId, whatsAppEnviarTextoRequestModel).subscribe((WhatsAppResponseModel) => {
        safeCall(WhatsAppResponseModel, () => {

          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppResponseModel));

          if (WhatsAppResponseModel.success) {
            this.snotifyService.info("Texto Enviado com sucesso " + WhatsAppResponseModel.message);
          } else {
            this.snotifyService.info("Erro ao Enviar Texto!" + WhatsAppResponseModel.message);

          }

        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.hideLoading();

    }
  }



  
  WhatsAppEnviarArquivos() {
    this.mEnviandoArquivo = false;
  
    const dialogRef = this.dialog.open(WhatsAppEnviarArquivoModalComponent, {
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idSessao: this.mSessionId,
        idPessoa: this.idPessoa,
        foneDestinoTratado: this.formulario.get("foneMensagemTratado").value

      }

    });

    dialogRef.afterClosed().subscribe(result => {
      this.mEnviandoArquivo = false;
    });


  }





  fAbrirAbaQrCode(pIdSessao: string, pQrCode: String) {
    const dialogRef = this.dialog.open(WhatsAppQrCodeModalComponent, {
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idSessao: pIdSessao,
        stringQrCode: pQrCode

      }

    });

    dialogRef.afterClosed().subscribe(result => {
      this.mBuscandoQrCode = false;
    });


  }



}

