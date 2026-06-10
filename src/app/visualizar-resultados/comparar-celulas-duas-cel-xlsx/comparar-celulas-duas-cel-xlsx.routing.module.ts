import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompararCelulasDuasCelXlsxComponent } from "./comparar-celulas-duas-cel-xlsx.component";

const routes: Routes =[
    { path: '', component:  CompararCelulasDuasCelXlsxComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class compararCelulasDuasCelXlsxRoutingModule {}
