import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, Component, HostBinding, OnInit, VERSION, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@base-core/animation/slide-animation';
import { ShowDialogQuestion } from '@base-shared/dialog-question/show-dialog-question.component';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { SessionService } from 'src/app/base/base-core/session/session.service';
import { ControllerNavForm, NAME_CONTROL_NAV_BAR_FORM_NAME } from './controller-nav-form';
import { NavItem } from './menu/menu.component';
import { NavService } from './menu/nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [slideInAnimation]
})
export class MainNavComponent implements OnInit, AfterViewInit {

  isShow = false;
  functionName: string;
  companyName: string;
  companyNameId: string;
  userName: string;
  userId: string;
  isShowSearchButton = true;

  //uso: https://angular.io/api/core/HostBinding
  @HostBinding('class') className = '';

  @ViewChild('appDrawer', { static: true }) appDrawer: MatSidenav;
  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;
  version = VERSION;
  formControlSearchMenu = new UntypedFormControl('');
  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  functionsNames: FunctionName[] = [
    { name: 'FER-001', labelKey: 'cadpessoas' },
    { name: 'FER-003', labelKey: 'dasdboard' },
    { name: 'FER-011', labelKey: 'teste' }

  ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private overlay: OverlayContainer,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialogQuestion: ShowDialogQuestion,
    readonly navService: NavService,
    private sessionService: SessionService,
    readonly route: ActivatedRoute,
    private controllerNavBar: ControllerNavForm
  ) {
  }

  ngOnInit() {
    this.form = this.controllerNavBar.form;
    this.fields = this.controllerNavBar.fields;
    this.onListenerSelectItem();
    this.setPath(this.router.url.substring(6));
    /*
    this.companyName = this.sessionService.getPayload()['DB_CONFIG']['companyName'];
    this.companyNameId = this.sessionService.getPayload()['DB_CONFIG']['companyId'];

    
    this.userId = this.sessionService.getPayload()['DB_CONFIG']['userId'];
    this.userName = this.sessionService.getPayload()['DB_CONFIG']['usernameLogged'];
    */
    this.functionName = this.navService.getNameToolLocalStorage();
    this.navService.tools.subscribe((name: string) => {
      this.functionName = this.getFunctionName(name);
    });

    this.controllerNavBar.$subject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchFunctionName(text);
    });

    //preferencia themes
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

  }

  //controle form theme
  toggleControl = new UntypedFormControl(false);

  searchFunctionName(value: string) {
    const result = this.controllerNavBar.optionsFunctionName.filter(o => o.value.includes(value));
    this.instanceForm.setInjectParam(0, { options: result });
  }

  private onListenerSelectItem() {
    this.controllerNavBar.handleSelectItem = (item: ItemOptionList) => {
      this.controllerNavBar.form.get(NAME_CONTROL_NAV_BAR_FORM_NAME).setValue(item.value);
      this.functionName = item.param['name'];
      this.navService.closeNav();
      this.navService.setNameTool(this.functionName);
      const path = item.param['path'];
      this.router.navigate([path], { relativeTo: this.route });
    }
  }

  openMenu() {
    if (this.appDrawer.opened) {
      this.navService.closeNav();
    } else {
      this.navService.openNav();
    }
  }


  drawableClick() {
    this.isShow = !this.isShow
  }

  setPath(path: string) {
    this.functionName = this.getFunctionName(path);
  }

  private getFunctionName(indexByName): string {
    const functionName = this.functionsNames.find(o => o.labelKey === indexByName || o.name === indexByName);
    if (functionName === undefined) {
      return '';
    }
    return functionName.name;
  }

  logout() {
    const data = { title: 'Aviso', message: 'Deseja mesmo sair?' };
    const width = '400px';
    this.dialogQuestion.showDialog(width, data);
    this.dialogQuestion.handlerYes = () => {
      this.sessionService.removeToken();
      this.sessionService.removeDateExpired();
      this.router.navigate(['/login']);
    }
    this.dialogQuestion.handlerNo = () => { };
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  showSearch() {
    this.isShowSearchButton = false;
  }


  private personMenu = {
    displayName: 'Clientes',
    iconName: 'people',
    route: '',
    children: [
      {
        displayName: 'Cadastro de Clientes',
        iconName: 'person_add',
        route: 'cadpessoas',
        name: 'FER-001'
      }
    ]
  };

  private productMenu = {
    displayName: 'Arquivos',
    iconName: 'folder_open',
    route: '',
    children: [
      {
        displayName: 'Enviar Arquivos',
        iconName: 'upload_file',
        route: 'enviar-arquivos'

      },
      {
        displayName: 'Processar Arquivos EFD-ICMS',
        iconName: 'receipt_long',
        route: 'processarEFDICMS'
      },
      {
        displayName: 'Processar Sintegra',
        iconName: 'sync_alt',
        route: 'processarSintegra'
        
      }
    ]
  };

  // inicio 

  private dasdboardMenu = {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: '',
    children: [
      {
        displayName: 'Dashboard 01',
        iconName: 'bar_chart',
        route: 'dasdboard01'
      },
      {
        displayName: 'Resultados',
        iconName: 'analytics',
        route: 'resultados'
      },
      {
        displayName: 'Saidas c/Entradas C170',
        iconName: 'swap_horiz',
        route: 'saidasComEntC170'
      },
      {
        displayName: 'Govesa',
        iconName: 'map',
        route: 'govesa'
      },


      {
        displayName: 'teste2',
        iconName: 'science',
        route: 'teste2'
      }
    ]
  };



  private efdIcms = {
    displayName: 'EFD-ICMS',
    iconName: 'receipt_long',
    route: '',
    children: [
      {
        displayName: 'Registros C100 - Consulta',
        iconName: 'search',
        route: 'cadrc100Consulta'
      },
    ]
  };

// inicio
private parametros = {
  displayName: 'Parametros',
  iconName: 'settings',
  route: '',
  children: [
    {
      displayName: 'Configurações',
      iconName: 'tune',
      route: 'configuracoes'
    },
    {
      displayName: 'Importar Dados Iniciais',
      iconName: 'download',
      route: 'importarDadosIniciais'
    }
]
};

private retaguarda = {
  displayName: 'Serviços Retaguarda',
  iconName: 'build_circle',
  route: '',
  children: [
    {
      displayName: 'Gerar Cadrc170 Padrão Sefaz',
      iconName: 'description',
      route: 'cadrc170Sefaz'
    },
    {
      displayName: 'Produto x Cfop',
      iconName: 'category',
      route: 'produtoXCfop'
    },
    {
      displayName: 'Preços Unitários',
      iconName: 'Price',
      route: 'cadpcoUnitarioAnual'
    },

    {
      displayName: 'Resultados Gerais',
      iconName: 'bar_chart',
      route: 'retaguardaVisualizar'
    },
    {
      displayName: 'Comparar 2 Bancos de Dados C170',
      iconName: 'compare',
      route: 'comparar2BcoDadosC170'
    },
    {
      displayName: 'Registros C170',
      iconName: 'list_alt',
      route: 'cadrc170Get'
    },
    {
      displayName: 'Importar Planilhas',
      iconName: 'table_chart',
      route: 'importarPlanilhas'
    }


]
};



  // termino




  private testeMenu = {
    displayName: 'Testes Diversos',
    iconName: 'science',
    route: '',
    children: [

      {
        displayName: 'teste',
        iconName: 'biotech',
        route: 'teste'
      },
      {
        displayName: 'Formulario 1',
        iconName: 'dynamic_form',
        route: 'formulario1'
      }

    ]
  };



  private teste2Menu = {
    displayName: 'teste2',
    iconName: 'science',
    route: '',
    children: [

      {
        displayName: 'teste2',
        iconName: 'biotech',
        route: 'teste2'
      }
    ]
  };


  

navItems: NavItem[] = [
  {
    displayName: 'Administrativo',
    iconName: 'recent_actors',
    route: '',
    children: [
      {
        displayName: 'Cadastro Administrativo',
        iconName: 'group',
        route: '',
        children: [
          this.personMenu,
          this.productMenu,          
          this.dasdboardMenu,
          this.parametros,
          this.testeMenu,
          this.teste2Menu,
          this.efdIcms,
          this.retaguarda,
          //          this.cadclassificacao,
        ]
      }
    ]
  }
];

ngAfterViewInit() {
  this.navService.appDrawer = this.appDrawer;
}

}
export interface MenuNood {
  name?: string;
  children?: MenuNood[];
}

export interface FlatMenuNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface FunctionName {
  name: string;
  labelKey: string;
  path?: string;
}
