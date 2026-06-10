// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LerDadosDoPdfComponent } from "./ler-dados-do-pdf/ler-dados-do-pdf.component";


const routes: Routes =[
    { path: '', component: LerDadosDoPdfComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class GovesaRoutingModule {}
