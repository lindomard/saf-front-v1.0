// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadpcoUnitarioAnualComponent } from "./cadpco-unitario-anual/cadpco-unitario-anual.component";

const routes: Routes =[
    { path: '', component: CadpcoUnitarioAnualComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class CadpcoUnitarioAnualRoutingModule {}
