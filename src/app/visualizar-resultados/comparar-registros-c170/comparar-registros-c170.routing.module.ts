import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompararRegistrosC170Component } from "./comparar-registros-c170.component";

const routes: Routes =[
    { path: '', component:  CompararRegistrosC170Component }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class CompararRegistrosC170RoutingModule {}
