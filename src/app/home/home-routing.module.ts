import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MainNavComponent } from './component/main-nav/main-nav.component';
import { Formulario1Component } from '../formulario1/formulario1.component';
import { ConclusaoComponent } from '../retaguarda-visualizar-resultados/conclusao/conclusao.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: 'cadpessoas',

        loadChildren: () => import('../cadcli/cadpessoas.module').then(m => m.CadpessoasModule),

      },

      {
        path: 'enviar-arquivos',

        loadChildren: () => import('../arquivos/arquivos.module').then(m => m.ArquivosModule),

      },
      {
        path: 'processarEFDICMS',
        loadChildren: () => import('../cadcli/processar/processar.module').then(m => m.ProcessarModule)
      },
      {
        path: 'processarSintegra',
        loadChildren: () => import('../processar-sintegra/processar-sintegra.module').then(m => m.ProcessarSintegraModule)
      },

      {
        path: 'dasdboard01',
        loadChildren: () => import('../dashboard01/dashboard01.module').then(m => m.Dashboard01Module)

      },

      {
        path: 'configuracoes',
        loadChildren: () => import('../configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule)

      },


      {
        path: 'cadrc100Consulta',
        loadChildren: () => import('../efd-icms/cadrc100-consulta/cadrc100-consulta.module').then(m => m.Cadrc100ConsultaModule)

      },

      {
        path: 'resultados',

        loadChildren: () => import('../visualizar-resultados/visualizar-resultados.module').then(m => m.VisualizarResultadosModule)

      },
      

      {
        path: 'saidasComEntC170',

        loadChildren: () => import('../saidas-com-entradas-c170/saidas-com-entradas-c170.module').then(m => m.SaidasComEntradasC170Module)

      },

      {
        path: 'govesa',

        loadChildren: () => import('../govesa/govesa.module').then(m => m.GovesaModule)

      },

      {
        path: 'compararDuasCelXlsx',
        loadChildren: () => import('../visualizar-resultados/comparar-celulas-duas-cel-xlsx/comparar-celulas-duas-cel-xlsx.module')
        .then(m => m.CompararCelulasDuasCelXlsxModule)

      },

      {
        path: 'comparar2BcoDadosC170',
        loadChildren: () => import('../visualizar-resultados/comparar-registros-c170/comparar-registros-c170.module')
        .then(m => m.CompararRegistrosC170Module)

      },

      {
        path: 'produtoXCfop',

        loadChildren: () => import('../produto-x-cfop/produto-x-cfop.module').then(m => m.ProdutoXCfopModule)

      },

      {
        path: 'cadpcoUnitarioAnual',

        loadChildren: () => import('../cadpco-unitario-anual/cadpco-unitario-anual.module').then(m => m.CadpcoUnitarioAnualModule)

      },

      {
        path: 'cadrc170Get',

        loadChildren: () => import('../visualizar-resultados/cadrc170-get/cadrc170-get.module').then(m => m.Cadrc170GetModule)

      },

      {
        path: 'importarPlanilhas',

        loadChildren: () => import('../importar-planilhas/importar-planilhas.module').then(m => m.ImportarPlanilhasModule)

      },


      {
        path: 'formulario1',

        component: Formulario1Component

      },

      {
        path: 'retaguardaVisualizar',
        loadChildren: () => import('../retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.module')
        .then(m => m.RetaguardaVisualizarResultadosModule)

      },

      {
        path: 'analiseEstrutural',
        loadChildren: () => import('../servicos-retaguarda/analise-estrutural/analise-estrutural.module')
        .then(m => m.AnaliseEstruturalModule)

      },




      {
        path: 'teste2',

        //        component: FiltrosCamposComponent
        //        loadChildren: () => import('../filtrar-campos/filtrar-campos.module').then(m => m.FiltrarCamposModule)
        //      loadChildren: () => import('../tela-abertura/tela-abertura.module').then(m => m.TelaAberturaModule)
        loadChildren: () => import('../teste2/teste2.module').then(m => m.Teste2Module)

      },


      

      {
        path: 'home',
        component: HomePageComponent,
        data: { animation: 'page' }
      },
      {
        path: 'cadConclusao',

        loadChildren: () => import('../retaguarda-visualizar-resultados/conclusao/conclusao.module')
        .then(m => m.ConclusaoModule)
      },
      {
        path: 'cadrc170Sefaz',

        loadChildren: () => import('../gerar-cadrc170-sefaz/gerar-cadrc170-sefaz.module')
        .then(m => m.GerarCadrc170SefazModule)
      }

    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
