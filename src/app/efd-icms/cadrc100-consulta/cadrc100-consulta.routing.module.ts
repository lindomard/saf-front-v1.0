// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Cadrc100ConsultaComponent } from "./cadrc100-consulta.component";

const routes: Routes =[
    { path: '', component: Cadrc100ConsultaComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class Cadrc100ConsultaRoutingModule {}
