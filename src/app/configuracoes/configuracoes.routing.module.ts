// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfiguracoesComponent } from "./configuracoes.component";

const routes: Routes =[
    { path: '', component: ConfiguracoesComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class ConfiguracoesRoutingModule {}
