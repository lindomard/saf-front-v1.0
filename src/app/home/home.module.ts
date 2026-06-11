import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { RegisterPersonModule } from '@register/register-person.module';
import { OpenConnectorRepositoryService } from '@sign/data/repositories/open-connector-repository.service';
import { OpenconnectorRepository } from '@sign/domain/repositories/open-connector-repository';
import { OpenConnectorUseCase } from '@sign/domain/usecase/open-connector-usecase';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MainNavComponent } from './component/main-nav/main-nav.component';
import { MenuSizeComponent } from './component/main-nav/menu-size/menu-size.component';
import { MenuComponent } from './component/main-nav/menu/menu.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadosModule } from '../resultados/resultados.module';
import { WebsocketService } from '../websocket/websocket.service';


@NgModule({
  declarations: [
    MainNavComponent,
    HomePageComponent,
    MenuSizeComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RegisterPersonModule,
    BaseSharedModule,
    NgbProgressbarModule
    , ResultadosModule
  ],
  exports: [],

  providers: [
    OpenConnectorUseCase, WebsocketService,
    { provide: OpenconnectorRepository, useClass: OpenConnectorRepositoryService }
  ]
})
export class HomeModule { }
