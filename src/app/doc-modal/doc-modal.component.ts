import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

// import { ConfirmationComponent } from 'src/app/@theme/components/confirmation/confirmation.component';
// import { FileViwerComponent } from 'src/app/@theme/components/file-viwer/file-viwer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FileViwerComponent } from '../components/components/file-viwer/file-viwer.component';
import { ConfirmationComponent } from '../components/components/confirmation/confirmation.component';
import { FiltrosGenericosList } from '@base-core/model/filtros-genericos-model';
import { RetaguardaVisualizarResultadosModule } from "../retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.module";
import { BaseSharedModule } from "../base/base-shared/base-shared.module";

@Component({
  selector: 'ge-doc-modal',
  templateUrl: './doc-modal.component.html',
  styleUrls: ['./doc-modal.component.scss'],
})
export class DocModalComponent extends SimpleModalComponent<{ data: any, doc: any, prefix: any, endpoint: any, key: any }, any> implements OnInit {

  data: any;
  doc: any;
  prefix: any;
  endpoint: any;
  key: any;
  loading: boolean = false;

  @Output() onEvent = new EventEmitter<any>();
  @ViewChild('documentName') documentName!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;


  messages = {
    delete: 'Esta ação não poderá ser desfeita. O documento será <b class="text-danger">permanentemente excluído</b>. Tem certeza que deseja prosseguir com a exclusão?'
  }
  ngOnInit() {
  }

  constructor(
    //private service: ApiService,
    private modalService: SimpleModalService,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  getDynamicName(): string {
    return this.data?.[this.prefix + 'Nome'] || '';
  }
  getDynamicProperty(item: any, propertySuffix: string): any {
    return item?.[this.prefix + propertySuffix];
  }
  getDataProperty(propertyName: string): any {
    return this.data?.[propertyName];
  }

  submit() {
    /*
    const documentNameValue = this.documentName.nativeElement.value;
    const file = this.fileInput.nativeElement.files[0];
    //const fileFormat = file.type.split('/')[1];
    const fileExtension = file.name.split('.').pop();

    const dataDocument = {
      [this.prefix + 'dId']: null,
      [this.prefix + 'dIdccdquadrante']: this.data.ufId,
      [this.prefix + 'dTipoDocumento']: 1,
      [this.prefix + 'dNome']: file.name,
      [this.prefix + 'dDtVcto']: null,
      [this.prefix + 'dFormato']: fileExtension,
      [this.prefix + 'dObs']: documentNameValue,
      [this.prefix + 'dUrl']: null
    };


    const formData = new FormData();
    formData.append('data', JSON.stringify([dataDocument]));
    formData.append('dataExcluidos', JSON.stringify([]));
    formData.append('files', file);
    formData.append(this.key, this.data?.[this.prefix + 'Id']);

    const endpoint = this.endpoint.replace("GetList", "") + '/files';
    this.service.post(endpoint, formData).subscribe({
      next: () => {
        this.documentName.nativeElement.value = '';
        this.fileInput.nativeElement.value = '';
        this.loadData();

      },
      error: (err) => {
        console.error('Erro:', err)
      }
    });
    */
  }



  async delete(item: any) {
    /*
    const confirmation = await firstValueFrom(this.modalService.addModal(ConfirmationComponent, {
      title: 'Confirmar exclusão?',
      message: this.messages.delete
    }))

    if (!confirmation) return;

    const dataExcluidos: any = [item];

    const formData = new FormData();
    formData.append('data', JSON.stringify([]));
    formData.append('dataExcluidos', JSON.stringify(dataExcluidos));
    formData.append('files', '');
    formData.append(this.key, '');

    const endpoint = this.endpoint.replace("GetList", "") + '/files';
    this.service.post(endpoint, formData).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.error('Erro:', err)
      }
    });
  }
  loadData(): any {
    this.loading = true;
    const body: FiltrosGenericosList = {
      filtrosGenericosList: []
    };

    this.service.post(this.endpoint, body).subscribe({
      next: (resp) => {
        this.loading = false;
        const obj = resp.objeto;
        const id = this.data?.[this.prefix + 'Id'];
        const documentosDoUf = obj.filter((item: any) => item?.[this.prefix + 'Id'] === id);

        if (documentosDoUf.length > 0) {
          const doc = documentosDoUf[0];
          this.data = doc;
        } else {
          console.log('Nenhum documento encontrado');
        }
      },
      error: (error) =>{
        this.loading = false;
        console.error('Erro', error)
      }
    });
    */
  }



  /*
  view(data: any) {
    const baseUrl = 'https://www.erpgenesisweb.com.br/file';
    const fileUrl = data['ufdNome'].includes('static//')
      ? baseUrl + data['ufdNome'].replace('static//', '')
      : baseUrl + data['ufdNome'];
    window.open(fileUrl, '_blank');
  }
    */


  handleTableEvent(event: any): void {
    const { data } = event;
    const url = this.prefix + 'dUrl';

    if (!data[url]) {
      console.error('URL inválida ou ausente:', data[url]);
      return;
    }

    const extension = data[url].split('.').pop()?.toLowerCase();
    let fileUrl = data[url].includes('static//')
      ? 'http://localhost/file/' + data[url].replace('static//', '')
      : data[url];

    this.modalService.addModal(FileViwerComponent, {
      url: !data[url].includes('static//') && extension !== 'pdf'
        ? this.sanitizer.bypassSecurityTrustUrl(fileUrl)
        : fileUrl,
      extension,
      fromUrl: !data[url].includes('static//')
    });
  }

}

