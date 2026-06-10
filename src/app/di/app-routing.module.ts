import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../base/base-core/guard/login.guard';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  {
    path: 'login',
  loadChildren: () => import('../tela-abertura/tela-abertura.module').then(m => m.TelaAberturaModule)
  },
  {
    path: 'page',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'teste',
    component: TesteComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
