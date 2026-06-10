import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './component/sing-in/sign-in.component';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { ProgressBarFullComponent } from '@base-shared/progress-bar-full/progress-bar-full.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        BaseSharedModule
    ],
    exports: [RouterModule]
})
export class SingRoutingModule { }
