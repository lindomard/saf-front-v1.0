import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SaidasComEntradasC170Component } from "./saidas-com-entradas-c170/saidas-com-entradas-c170.component";

const routes: Routes =[
    { path: '', component:  SaidasComEntradasC170Component }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class SaidasComEntradasC170RoutingModule {}
