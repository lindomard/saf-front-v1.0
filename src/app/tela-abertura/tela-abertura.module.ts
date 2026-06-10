import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteTalaComponent } from './tela-abertura/tela-abertura.component';
import { TesteTelaRoutingModule } from './tela-abertura-routing.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageAnimateComponent } from './image-animate/image-animate.component';
import { SwiperModule } from "swiper/angular";
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    TesteTalaComponent,
    LoginComponent,
    ImageAnimateComponent,
    CadastrarPessoaComponent
  ],
  imports: [
    CommonModule
    , TesteTelaRoutingModule
    , BaseSharedModule
    , FormsModule
    , ReactiveFormsModule
    , SwiperModule
    
    

  ]
})
export class TelaAberturaModule { }
