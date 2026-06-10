import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingRoutingModule } from './sing-routing.module';
import { BaseSharedModule } from '../base/base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './component/sing-in/sign-in.component';
import { SignInRepository } from './domain/repositories/sign-in-repository';
import { LoadingInterceptor } from '@base-core/interceptor/loading.interceptor';
import { SignInRepositoryService } from './data/repositories/sign-in-repository.service';
import { SignUsecase } from './domain/usecase/sign-usecase';
import { SignController } from './component/sing-in/sign-controller';
import { SignForm, instanceSignForm } from './form/sign-form';
import { SignControllerSL } from './component/sing-in/sign-controllerSL';

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    BaseSharedModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SingRoutingModule
  ],
  providers: [
    SignController,SignControllerSL,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    SignUsecase,
    { provide: SignInRepository, useClass: SignInRepositoryService },
    { provide: SignForm, useFactory: instanceSignForm }
  ]
})
export class SingModule { }
