import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RetaguardaVisualizarResultadosComponent } from "./retaguarda-visualizar-resultados.component";

const routes: Routes =[
    { path: '', component:  RetaguardaVisualizarResultadosComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class RetaguardaVisualizarResultadosRoutingModule {}
