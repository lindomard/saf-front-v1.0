import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EfdSemXmlModalComponent } from "./efd-sem-xml-modal/efd-sem-xml-modal.component";

const routes: Routes =[
    { path: '', component:  EfdSemXmlModalComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class ResultadosRoutingModule {}
