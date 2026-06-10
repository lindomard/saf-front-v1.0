// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GerarCadrc170SefazComponent } from "./gerar-cadrc170-sefaz/gerar-cadrc170-sefaz.component";

const routes: Routes =[
    { path: '', component: GerarCadrc170SefazComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class GerarCadrc170SefazRoutingModule {}
