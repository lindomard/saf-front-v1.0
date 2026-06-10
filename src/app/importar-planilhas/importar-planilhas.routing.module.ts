// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImportarPlanilhasComponent } from "./importar-planilhas/importar-planilhas.component";

const routes: Routes =[
    { path: '', component: ImportarPlanilhasComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class ImportarPlanilhasComponentRoutingModule {}
