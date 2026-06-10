import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@base-core/session/session.service';
import { ShowDialogWarningComponent } from '@base-shared/dialog-warning/show-dialog-warning.component';

@Component({
  selector: 'app-menu-size',
  templateUrl: './menu-size.component.html',
  styleUrls: ['./menu-size.component.scss']
})
export class MenuSizeComponent implements OnInit {

  constructor(
    private dialogWarning: ShowDialogWarningComponent,
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  @Output('handlerLogout') handlerLogout = new EventEmitter<void>();
  path: string;
  companyName: string;

  isShowShortcutMenu = true;

  private functionsNames: FunctionName[] = [
    {name: 'FER-001', indexByName: 'cadpessoas'},
    {name: 'FER-002', indexByName: 'cadastro-classificacão'},
    {name: 'FER-003', indexByName: 'cadastro-empresa'},
    {name: 'FER-004', indexByName: 'cadastro-cnae'},
    {name: 'FER-005', indexByName: 'cadastro-paises'},
    {name: 'FER-006', indexByName: 'cadastro-estados'},
    {name: 'FER-007', indexByName: 'cadastro-cidades'},
    {name: 'FER-008', indexByName: 'termometro'},
    { name: 'FER-009', indexByName: 'cadleiterm' },
    { name: 'FER-010', indexByName: 'cadastro-pessoa-ant' },
    { name: 'FER-011', indexByName: 'teste' },
        

  ];

  ngOnInit() {
    this.setPath(this.router.url.substring(6));
    this.companyName = this.sessionService.getPayload()['DB_CONFIG']['companyName'];
  }

  configProfiler(): void {
    this.dialogWarning.show('Aviso!', 'Funcionanlida em desenvolvimento');
  }

  closeMenu(): void {
  }

  openWindow() {
    const newUrl = this.router.createUrlTree(['/page/cadastro-pessoa']);
    const baseUrl = window.location.href.replace(this.router.url, '');
    window.open(`${baseUrl}${newUrl}`, '_blank');
  }

  setPath(path: string) {
    this.path = this.getFunctionName(path);
    console.log(this.path);
  }

  private getFunctionName(indexByName): string {
    const functionName = this.functionsNames.find(o => o.indexByName === indexByName || o.name === indexByName);
    if (functionName === undefined) {
      return '';
    }
    return functionName.name;
  }

}

export interface FunctionName {
  name: string;
  indexByName: string;
}
