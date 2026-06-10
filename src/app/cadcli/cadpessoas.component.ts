import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, FormGroup, FormArray } from '@angular/forms';
import { Alert } from '../formulario1/model/alert.model';
import { ValidarCnpjCpfService } from '@base-core/service/validar-cnpj-cpf.service';
import { ItemSelect, ItemSelectIdStr } from '@base-shared/select/select.component';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { CadpessoasService } from './cadpessoas.service';
import { ViaCepModel } from '@register/data/model/viacep.model';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { safeCall } from '@base-core/safe-call';
import { fillForm } from '@base-core/fill-form/fill-form';
import { ServicosDisponiveis } from './model/ServicosDisponiveis';
import { getFormValidationErrors, validarForm } from '@base-core/function/validar-forms';
import { cadpessoasMapper } from './mapper/cadpessoas-mapper';
import { CadPessoasModel, CadpessoasServicosModel } from './model/cadpessoasModel';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { CadservicosModel, CadservicosResumidoModel } from './model/cadservicosModel';
import { DATE_FORMAT, DATE_FORMAT_BRAZIL, DATE_TIME_FORMAT, converterDateToString } from '@base-core/state/converter-date';
import { pick } from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@base-core/session/session.service';
import { environment } from 'src/environments/environment';
import { JwtToken } from '@base-core/model/jwt-token';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';


@Component({
  selector: 'app-cadpessoas',
  templateUrl: './cadpessoas.component.html',
  styleUrls: ['./cadpessoas.component.scss']
})
export class CadpessoasComponent implements OnInit {


  mTipoOperacao = "Editando ";
  constructor(private validarCnpjCpf: ValidarCnpjCpfService
    , private fb: UntypedFormBuilder
    , private snotifyService: SnotifyService
    , private cadpessoasService: CadpessoasService
    , private router: Router

    , private route: ActivatedRoute
    , private session: SessionService

  ) {


  }


  private cadpessoasMapper = cadpessoasMapper();

  type = 'dark';


  active = 1;
  idPessoa: any = -1;
  mIndexEdit: number = -1;

  public mErroNome: string = "";
  public formulario: UntypedFormGroup;


  public buscandoPorCnpj = false;
  alerts: Alert[] = [
    { type: 'success', message: 'Dados estão corretos.' },
    { type: 'danger', message: 'Dados estão invalidos.' }
  ]


  public estados: ItemSelectIdStr[] = [];
  public niveis: ItemSelect[] = [];

  public cadpessoasUsuarioForm: UntypedFormGroup;

  ListaCadpessoasServicosModel: CadpessoasServicosModel[] = [];



  mensagemAlert: Alert | undefined;


  selectedTab: number = 1;

  listaServicos: ServicosDisponiveis[] = [];

  servicosDisponiveis: ServicosDisponiveis;


  selectTab(tabNumber: number): void {
    this.selectedTab = tabNumber;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {

        this.idPessoa = params['idPessoa'];
        if (this.idPessoa == undefined) {
          this.mTipoOperacao = "Editando ";
          this.idPessoa = this.session.companyId;
        } else {
          this.mTipoOperacao = "Incluindo ";
        }
      }

    )



    if (this.idPessoa == -1) {
      this.idPessoa = this.session.companyId;

    }

    this.inicializarForm();
    this.estados = this.optionsIbptUf;
    this.niveis = this.optionsNiveis;
    //    this.formulario.get("cpCnpj").setValue("02.299.715/0001-12");
    this.cadpessoasUsuarioForm = this.createFilhoFormGroup();
    this.carregarListaDeServicos();

    //console.log('vai ler ', this.idPessoa )
    if (this.idPessoa == 0) {
      let token: JwtToken;

      //    token = JSON.parse(environment.tokenInvalido);
      //      this.session.setJwtLocalStorage(token);
    } else {
      this.buscarCadpessoas(this.idPessoa);
    }

  }

  inicializarForm() {

    this.formulario = this.fb.group({
      cpRazaoSocial: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpDenom: ['', []],
      cpCnpj: ['', [Validators.required, Validators.minLength(3)], [this.validarCnpjCpf.validarCnpj()]],
      cpIe: ['', []],
      cpEnderLog: ['', [Validators.required, Validators.minLength(3)]],
      cpEnderComplemento: ['', []],
      cpEnderNum: ['', []],
      cpEnderBairro: ['', []],
      cpEnderCep: ['', [Validators.required, Validators.minLength(3)]],
      cpEnderCidade: ['', [Validators.required, Validators.minLength(3)]],
      cpEnderuf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cpEnderCodlocIbge: ['', []],
      cpDtRefIni: ['', [Validators.required]],
      cpDtRefFin: ['', [Validators.required]],
      cpFone: ['', []],

      cpEmail: ['', []],
      cpObs: ['', []],
      cpConsisteCadpro: ['', []],
      cpQtdNfMensal: [0, []],
      cpUeveComputador: ['', []],
      cpCodusrInc: [0, []],
      cpCodusrUeve: [0, []],
      cpConsisteCadpart: ['', []],
      cpConsisteData54Sintegra: ['', []],
      cpId: [0, []],
      cpDathorUeve: [''],
      cpDathorInc: [''],
      cpPastaDefault: [''],


      cadpessoasUsuarios: this.fb.array([
      ]),
      cadpessoasServicos: this.fb.array([
      ])




    });

  }

  createFilhoFormGroup(): UntypedFormGroup {
    return this.fb.group({
      puFone: [''],
      puObs: [''],
      puIdPessoa: [0],
      puNome: [''],
      puWhatsapp: [''],
      puId: [0],
      puNivel: [0],
      puCpf: ['', [Validators.required, Validators.minLength(3)], [this.validarCnpjCpf.validarCpf()]],

      puSenha: ['', [Validators.required, Validators.minLength(3)]],
      puSenhaConfirmacao: ['', [Validators.required, Validators.minLength(3)], [this.cadpessoasService.CpCuSenhaConfirmaConfere()]],

      puEmail: ['', [Validators.email]]
    })
  }

  limparCamposCadpessoasUsuarios() {

    this.cadpessoasUsuarioForm.get("puFone").setValue("");
    this.cadpessoasUsuarioForm.get("puObs").setValue("");
    this.cadpessoasUsuarioForm.get("puNome").setValue("");
    this.cadpessoasUsuarioForm.get("puWhatsapp").setValue("");
    this.cadpessoasUsuarioForm.get("puCpf").setValue("");
    this.cadpessoasUsuarioForm.get("puSenha").setValue("");
    this.cadpessoasUsuarioForm.get("puSenhaConfirmacao").setValue("");
    this.cadpessoasUsuarioForm.get("puEmail").setValue("");
    this.cadpessoasUsuarioForm.get("puIdPessoa").setValue(0);
    this.cadpessoasUsuarioForm.get("puId").setValue(0);
    this.cadpessoasUsuarioForm.get("puNivel").setValue(0);

  }


  validar() {

  }

  close() {

  }

  onClickCnpj() {

    console.log('cnpj erros ', this.formulario.get("cpCnpj").errors);
    console.log('cnpj erros ', this.formulario.get("cpCnpj").errors);
    console.log('cnpj ERROR to string  ', this.formulario.get("cpCnpj").getError.toString());
    console.log('cnpj json   ', JSON.stringify(this.formulario.get("cpCnpj").getError));

  }





  get optionsIbptUf(): ItemSelectIdStr[] {
    return [
      { id: 'AC ', name: 'AC ' }
      , { id: 'AL', name: 'AL' }
      , { id: 'AM', name: 'AM' }
      , { id: 'AP', name: 'AP' }
      , { id: 'BA', name: 'BA' }
      , { id: 'CE', name: 'CE' }
      , { id: 'DF', name: 'DF' }
      , { id: 'ES', name: 'ES' }
      , { id: 'EX', name: 'EX' }
      , { id: 'GO', name: 'GO' }
      , { id: 'MA', name: 'MA' }
      , { id: 'MG', name: 'MG' }
      , { id: 'MS', name: 'MS' }
      , { id: 'MT', name: 'MT' }
      , { id: 'PA', name: 'PA' }
      , { id: 'PB', name: 'PB' }
      , { id: 'PE', name: 'PE' }
      , { id: 'PI', name: 'PI' }
      , { id: 'PR', name: 'PR' }
      , { id: 'RJ', name: 'RJ' }
      , { id: 'RN', name: 'RN' }
      , { id: 'RO', name: 'RO' }
      , { id: 'RR', name: 'RR' }
      , { id: 'RS', name: 'RS' }
      , { id: 'SC', name: 'SC' }
      , { id: 'SE', name: 'SE' }
      , { id: 'SP', name: 'SP' }
      , { id: 'TO', name: 'TO' }
    ];
  }


  // inicio


  get optionsNiveis(): ItemSelect[] {
    return [
      { id: 0, name: 'Consulta' }
      , { id: 1, name: 'Enviar Dados' }
      , { id: 2, name: 'Master' }
    ];
  }


  // termino


  selectedTabChange(event: any) {
    console.log('Pagina selecionada ', event);
  }

  showLoading() {
    this.buscandoPorCnpj = true;
  }

  hideLoading() {
    this.buscandoPorCnpj = false;
  }

  fBuscarDadosPeloCep() {
    try {

      this.showLoading();
      let pCep = this.formulario.get("cpEnderCep").value;
      console.log('uf ao entrar ', this.formulario.get("cpEnderuf").value)

      this.cadpessoasService.PegarDadosAtravesDoCep(pCep).subscribe((viaCepModel) => {
        safeCall(viaCepModel, () => {

          const form = this.formulario;
          fillForm("cpEnderLog", form, viaCepModel.logradouro);
          fillForm("cpEnderBairro", form, viaCepModel.bairro);

          fillForm("cpEnderCidade", form, viaCepModel.localidade);
          fillForm("cpEnderuf", form, viaCepModel.uf.toUpperCase());
          fillForm("cpEnderCodlocIbge", form, viaCepModel.ibge);
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



  fBuscarDadosPeloCnpj() {
    this.showLoading();
    let pCnpj = this.formulario.get("cpCnpj").value;
    console.log('cnpj ao entrar ', this.formulario.get("cpCnpj").value)

    this.cadpessoasService.PegarDadosAtravesDoCnpj(pCnpj).subscribe((dadosPessoasModel) => {
      safeCall(dadosPessoasModel, () => {

        const form = this.formulario;
        fillForm("cpEnderLog", form, dadosPessoasModel.logradouro);
        fillForm("cpEnderComplemento", form, dadosPessoasModel.complemento);
        fillForm("cpEnderNum", form, dadosPessoasModel.numero);
        fillForm("cpEnderBairro", form, dadosPessoasModel.bairro);
        fillForm("cpEnderCep", form, dadosPessoasModel.cep);
        fillForm("cpEnderCidade", form, dadosPessoasModel.municipio);
        fillForm("cpEnderuf", form, dadosPessoasModel.uf.toUpperCase());
        fillForm("cpEnderCodlocIbge", form, dadosPessoasModel.codmunIbge);


        fillForm("cpCnpj", form, dadosPessoasModel.cnpj);
        fillForm("cpIe", form, dadosPessoasModel.ie);

        fillForm("cpRazaoSocial", form, dadosPessoasModel.nome);
        fillForm("cpFone", form, dadosPessoasModel.telefone);
        fillForm("cpEmail", form, dadosPessoasModel.email);
        fillForm("cpDenom", form, dadosPessoasModel.fantasia);
        this.hideLoading();
      })
    }, error => {
      this.snotifyService.error(error.error.message);
      this.hideLoading();
    }


    );

  }

  editarFilho(index) {

    this.mIndexEdit = index;
//    this.cadpessoasUsuarioForm = (<FormGroup>(<FormArray>this.formulario.get('cadpessoasUsuarios'))?.controls[index]);


    this.cadpessoasUsuarioForm.get("puFone").setValue(this.pegarValorDoCampo("puFone",index));
    this.cadpessoasUsuarioForm.get("puObs").setValue(this.pegarValorDoCampo("puObs",index));
    this.cadpessoasUsuarioForm.get("puNome").setValue(this.pegarValorDoCampo("puNome",index));
    this.cadpessoasUsuarioForm.get("puWhatsapp").setValue(this.pegarValorDoCampo("puWhatsapp",index));
    this.cadpessoasUsuarioForm.get("puCpf").setValue(this.pegarValorDoCampo("puCpf",index));
    this.cadpessoasUsuarioForm.get("puSenha").setValue(this.pegarValorDoCampo("puSenha",index));
    this.cadpessoasUsuarioForm.get("puEmail").setValue(this.pegarValorDoCampo("puEmail",index));
    this.cadpessoasUsuarioForm.get("puIdPessoa").setValue(this.pegarValorDoCampo("puIdPessoa",index));
    this.cadpessoasUsuarioForm.get("puId").setValue(this.pegarValorDoCampo("puId",index));
    this.cadpessoasUsuarioForm.get("puNivel").setValue(this.pegarValorDoCampo("puNivel",index));

    this.cadpessoasUsuarioForm.get("puSenhaConfirmacao").setValue(
    this.cadpessoasUsuarioForm.get("puSenha").value);
  }


  pegarValorDoCampo(pcampo: string, index: number): any {

   return  (<FormGroup>(<FormArray>this.formulario.get('cadpessoasUsuarios'))?.controls[index])?.controls[pcampo].value;     
  }

  cancelar() {

    this.mIndexEdit = -1;
    this.limparCamposCadpessoasUsuarios();    

  }


  removerFilho(index) {

    const filhos = this.formulario.get('cadpessoasUsuarios') as UntypedFormArray;
    filhos.removeAt(index);
  }

  adicionarFilho() {
    const filhos = this.formulario.get('cadpessoasUsuarios') as UntypedFormArray;
    filhos.push(this.createFilhoFormGroup());
  }


  adicionarUsuarios() {


    let mErros: string = "";

    if (this.cadpessoasUsuarioForm.valid == false) {
      this.cadpessoasUsuarioForm.hasError;
      this.cadpessoasUsuarioForm.setValidators;
      mErros = getFormValidationErrors(this.cadpessoasUsuarioForm) + "\n";
    }

    if (this.cadpessoasUsuarioForm.get("puSenha") == null || this.cadpessoasUsuarioForm.get("puSenha").value.length < 1) {
      mErros = mErros + "Senha Campo Obrigatório!\n";
    } else if (this.cadpessoasUsuarioForm.get("puSenha") == null || this.cadpessoasUsuarioForm.get("puSenhaConfirmacao").value.length < 1) {
      mErros = mErros + "Senha Diferente da Confirmação!\n";

    }


    if (mErros.length > 0) {
      validarForm(this.cadpessoasUsuarioForm);
      this.snotifyService.info(mErros);

    } else {


      const filhos = this.formulario.get('cadpessoasUsuarios') as UntypedFormArray;


      filhos.push(this.cadpessoasUsuarioForm);
    }
  }



  fAdicionarCadServicosNoModel(): CadpessoasServicosModel[] {
    let listacadpessoasServicosModel: CadpessoasServicosModel[] = [];
    // inicio


    for (let index = 1; index < this.listaServicos.length; index++) {
      if (this.listaServicos[index].check) {
        let cadpessoasServicosModel: CadpessoasServicosModel = {};
        cadpessoasServicosModel.psId = this.listaServicos[index].cpIdServ
        let cadservicosResumidoModel: CadservicosResumidoModel = {}


        cadservicosResumidoModel.csId = this.listaServicos[index].csId;
        cadpessoasServicosModel.psIdServicoCadservicosResumido = cadservicosResumidoModel;
        listacadpessoasServicosModel.push(cadpessoasServicosModel)


      }
    }
    return listacadpessoasServicosModel;

  }


  // termino




  salvar() {
    // Lógica para navegar para a pessoa anterior
    let mErros: string = "";

    if (this.formulario.valid == false) {
      this.formulario.hasError;
      this.formulario.setValidators;
      mErros = getFormValidationErrors(this.formulario) + "\n";
    }



    if (this.formulario.get("cpDtRefIni").value > this.formulario.get("cpDtRefFin").value) {


      let data: Date = this.formulario.get("cpDtRefIni").value;

      console.log('data  ', data)

      mErros = mErros + "Data Inicial " + FuncoesGerais.convertDate(data)
        + " maior que data final " + FuncoesGerais.convertDate(this.formulario.get("cpDtRefFin").value) + "\n";

    }

    const filhos: UntypedFormArray = this.formulario.get('cadpessoasUsuarios') as UntypedFormArray;
    if (filhos.length < 1) {
      mErros = mErros + "È necessário colocar pelo menos 1 usuario";
    }

    console.log('quantidade de filhos encontrados ', filhos.length)

    //    const filhos = this.formulario.get('cadpessoasUsuarios') as UntypedFormArray;




    if (mErros.length > 1) {
      console.log('tamanho merror ', mErros.length, 'conteudo ', mErros)
      validarForm(this.formulario);
      this.snotifyService.error(mErros);

    } else {




      let cadpessoasModel: CadPessoasModel = this.cadpessoasMapper.converterFormToModel(this.formulario);
      cadpessoasModel.cadpessoasServicos = this.fAdicionarCadServicosNoModel();

      try {

        this.showLoading();

        this.cadpessoasService.CadpessoasSalvar(cadpessoasModel).subscribe((Response) => {
          safeCall(Response, () => {

            if (Response.success) {
              this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);

              this.cancelarESair();
              /*
                            console.log(Response.objeto)
                            safeCall(Response.objeto[0], (obj) => {
              
                              this.fSetarValoresNoform(this.getValuesForForm(obj[0]));
              
                
                                        })
              */

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




      console.log('json ', cadpessoasModel)





    }
  }
  cancelarESair() {
    // Lógica para navegar para a próxima pessoa
    if (this.idPessoa == 0) {

      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }


  validarServicos(i) {



    this.listaServicos[i].check = this.listaServicos[i].check === false;
    const count = this.listaServicos.length - 1;
    const postodos = count;
    console.log("valor de i " + i + " checked " + this.listaServicos[i].check + " postdo " + postodos + " list servicos " + this.listaServicos[i].csNomeservico);
    if ('Todos' === this.listaServicos[i].csNomeservico) {
      for (let index = 0; index < this.listaServicos.length; index++) {
        console.log("setando novo valor " + i + " postdo " + postodos + " list servicos "
          + this.listaServicos[index].csNomeservico
          + " checked ant " + this.listaServicos[index].check
          + " checked novo " + this.listaServicos[i].check
        );
        this.listaServicos[index].check = this.listaServicos[i].check;

      }
    }

  }


  /*
   this.consultaCadr0200Service.CadR0200UnicoConsultaPage(this.filtrosParaConclusao, this.filtrosGenericos)
        .subscribe((api: ApiResponseList<Cadr0200UnicoConsultaModel>) => {
          this.filtrosParaConclusao.totalRegistros = api.totalElements;
          this.fTestarLogExcessoes([...api.content]);
        }
          , error => {
            this.snotifyService.error("Erro ao buscar  Log Excessoes!");
            this.isProgress = false;
          }
        );
    }
  */



  adicionarServicos(cadservicosModel: CadservicosModel[]) {
    this.listaServicos.push(new ServicosDisponiveis(0, "Todos", "true", 0));
    cadservicosModel.forEach(servico => {
      this.listaServicos.push(new ServicosDisponiveis(servico.csId, servico.csDescricao, "true", 0));

    })

  }

  carregarListaDeServicos() {

    // inicio

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];

    // inicio
    let ParametrosDados: ParametrosDados = {};
    ParametrosDados.filtrosGenericosList = filtrosGenericosLista;

    this.cadpessoasService.cadServicosGetList(ParametrosDados).subscribe((CadservicosModel) => {
      safeCall(CadservicosModel, () => {
        this.adicionarServicos(CadservicosModel);

      })
    }, error => {
      this.snotifyService.error(error.error.message);
    }
    )

    // termino

  }





  private getValuesForForm(obj: CadPessoasModel) {
    if (obj == null) {
      return null;
    }
    // retira parte do payload

    //    console.log(JSON.stringify(obj));
    //    const keys = "cadpessoasServicos;cadpessoasProcessos;cadpessoasUsuarios";
    const keys = "cadpessoasProcessos";
    const vkeys = Object.keys(obj)
      .filter(k => !keys.includes(k));
    const mteste = Object.assign({}, ...vkeys.map(k => k in obj ? { [k]: obj[k] } : {}))
    //    console.log('rodou teste')
    //  console.log(JSON.stringify(mteste))
    return mteste;
  }



  fAdicionarCadPessoasUsuarios(pQtd: number) {
    for (let i = 0; i < pQtd; i++) {
      this.adicionarFilho();
    }

  }

  fRemoverCadPessoasUsuarios(pQtd: number) {
    for (let i = 0; i < pQtd; i++) {
      this.removerFilho(0)
    }

  }
  fQtdUsuarios(): number {

    return (this.formulario.get('cadpessoasUsuarios') as UntypedFormArray).length;


  }

  fExisteServicos(cadPessoasModel: CadPessoasModel, pIdServico: number): number {
    if (cadPessoasModel.cadpessoasServicos) {
      for (let index = 0; index < cadPessoasModel.cadpessoasServicos.length; index++) {
        //      cadPessoasModel.cadpessoasServicos.forEach(servico => {


        //        console.log('dentro ', JSON.stringify(servico),' id do servicos ', pIdServico)
        if (cadPessoasModel.cadpessoasServicos[index].psIdServicoCadservicosResumido.csId === pIdServico) {

          console.log('retornou sim ')
          return cadPessoasModel.cadpessoasServicos[index].psId;


        }
      }
      //      })
    }
    return 0;
  }

  fMarcarServicos(cadPessoasModel: CadPessoasModel) {
    for (let index = 1; index < this.listaServicos.length; index++) {
      //      this.listaServicos[index].check = false;

      let idCadpessoasServicos = this.fExisteServicos(cadPessoasModel, this.listaServicos[index].csId);
      if (idCadpessoasServicos == 0) {
        this.listaServicos[index].check = false;
        this.listaServicos[index].cpIdServ = 0;

      } else {
        this.listaServicos[index].check = true;
        this.listaServicos[index].cpIdServ = idCadpessoasServicos;

      }
    };


  }

  fSetarValoresNoform(cadPessoasModel: CadPessoasModel) {


    safeCall(cadPessoasModel, () => {


      console.log('fsetar valores no form ', JSON.stringify(cadPessoasModel));
      let QtdUsuariosModel: number = cadPessoasModel.cadpessoasUsuarios.length;
      let QtdUsuariosForm: number = this.fQtdUsuarios();

      let mQtdAdicionar = QtdUsuariosModel - QtdUsuariosForm;
      if (mQtdAdicionar > 0) {
        this.fAdicionarCadPessoasUsuarios(mQtdAdicionar);

      } else if (mQtdAdicionar < 0) {
        this.fRemoverCadPessoasUsuarios(mQtdAdicionar * -1);

      }

      this.formulario.patchValue(this.getValuesForForm(cadPessoasModel));
      /*
          var arrayControl = this.formulario.get('cadpessoasUsuarios') as FormArray;
      
          const lengthValue = arrayControl.length;
      
          console.log('quantidade de usuarios NO FORM ', lengthValue);
      
          console.log('depois de receber os valores ')
          console.log(JSON.stringify(this.formulario.value))
      */
      safeCall(
        this.formulario.get("cpDathorInc").value, (it) => {
          this.formulario.get("cpDathorInc").setValue(
            converterDateToString(
              this.formulario.get("cpDathorInc").value, DATE_TIME_FORMAT));
        });

      safeCall(
        this.formulario.get("cpDathorUeve").value, (it) => {
          this.formulario.get("cpDathorUeve").setValue(
            converterDateToString(
              this.formulario.get("cpDathorUeve").value, DATE_TIME_FORMAT));
        });



      safeCall(
        this.formulario.get("cpDtRefIni").value, (it) => {
          this.formulario.get("cpDtRefIni").setValue(
            converterDateToString(
              this.formulario.get("cpDtRefIni").value, DATE_FORMAT));
        });


      safeCall(
        this.formulario.get("cpDtRefFin").value, (it) => {
          this.formulario.get("cpDtRefFin").setValue(
            converterDateToString(
              this.formulario.get("cpDtRefFin").value, DATE_FORMAT));
        });



      console.log('data ref ini ', this.formulario.get("cpDtRefIni").value);
      console.log('data ref fin ', this.formulario.get("cpDtRefFin").value);


      console.log('*****************INICIO****************************************')

      console.log('data inicial ', this.formulario.get("cpDtRefIni").value)
      console.log('data Final ', this.formulario.get("cpDtRefFin").value)

      console.log('*****************FINAL****************************************')

      //      this.formulario.get("cpDtRefIni").setValue(new Date())



      this.fMarcarServicos(cadPessoasModel);


    }
    )
  }



  buscarCadpessoas(pIdPessoa: number) {

    // inicio

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "cpId", "=", pIdPessoa.toString(),0," and ").adicionarfiltros();



    // inicio
    let ParametrosDados: ParametrosDados = {};
    ParametrosDados.filtrosGenericosList = filtrosGenericosLista;

    this.cadpessoasService.cadpesoasGetList(ParametrosDados).subscribe((Response) => {


      safeCall(Response.success, () => {

        console.log('valor obj  ', JSON.stringify(Response.success))
        console.log('valor obj 0 ', Response.success)

        this.fSetarValoresNoform(this.getValuesForForm(Response.objeto[0]));


      })

    }, error => {
      this.snotifyService.error(error.error.message);
    }
    )

    // termino

  }


  newTeacher(): UntypedFormGroup {
    return this.fb.group({
      name: "",
      batches: this.fb.array([])
    });
  }

}
