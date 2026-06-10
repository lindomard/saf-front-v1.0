import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigRelatorioComponent } from "./config-relatorio/config-relatorio.component";


const routes: Routes =[
    { path: '', component: ConfigRelatorioComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class DadosComunRoutingModule {}
