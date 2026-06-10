import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TesteTalaComponent } from "./tela-abertura/tela-abertura.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes =[
    { path: '', component: TesteTalaComponent },
    { path: 'loginTeste', component: LoginComponent }    
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})

export class TesteTelaRoutingModule {}