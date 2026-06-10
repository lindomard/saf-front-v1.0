import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { CompararRegistrosC170Service } from './comparar-registros-c170.service';
import { safeCall } from '@base-core/safe-call';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { SnotifyService } from 'ng-snotify';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';

@Component({
  selector: 'app-comparar-registros-c170',
  templateUrl: './comparar-registros-c170.component.html',
  styleUrls: ['./comparar-registros-c170.component.scss']
})
export class CompararRegistrosC170Component implements OnInit {


  tipoEvento: string = "Comparar 2 Banco de Dados Registros C170";
  isLoading: boolean = false;

  form: FormGroup;


  constructor(
     private router: Router
    , private baixarArquivosService: BaixarArquivosService
    ,private formBuilder: FormBuilder
    , private session: SessionService
    , private snotifyService: SnotifyService

    , private compararRegistrosC170Service: CompararRegistrosC170Service
  ) { }

  ngOnInit(): void {
    this.fCriarForm();

    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.isLoading = false;
      }
    })

  }



  baixarPlanilhas(nomeDoArquivoGeradoModel: NomeDoArquivoGeradoModel[]) {

    this.isLoading = true;

    nomeDoArquivoGeradoModel.forEach(obj => {
      if (obj.nomeDoArquivoGerado != null && obj.nomeDoArquivoGerado.length > 0) {
        this.baixarArquivosService.downloadarquivo(obj.nomeDoArquivoGerado);

      }
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }



  fComparar() {


    this.compararRegistrosC170Service.comparar2BancosC170Planilha(
      this.form.get("idTab01").value,this.form.get("idTab02").value )

        .subscribe((Response) => {
          if (Response.success) {
          this.baixarPlanilhas(Response.objeto);
          } else {
            this.snotifyService.error(Response.error);
            
          }
  
      }, error => {
        this.snotifyService.error(HttpMensage(error));
        BaixarArquivosService.terminouDownload.emit(true);

      }
      )



    this.compararRegistrosC170Service.comparar2BancosC170Planilha(this.form.get("idTab01").value,this.form.get("idTab02").value )


    // comparar2BancosC170Planilha(pId01: number, pId02: number): Observable<NomeDoArquivoGeradoModel[]> {


  }

  cancelarESair() {

    this.router.navigate(['/page/home']);


  }

  fCriarForm() {
    this.form = this.formBuilder.group({
      idTab01: new FormControl(this.session.companyId, Validators.required),
      idTab02: new FormControl(0, Validators.required)
    })
    /*
    this.form.get("idTab01").setValue(this.session.companyId);
    console.log('valor da company id',this.session.companyId)
    */
  }

}
