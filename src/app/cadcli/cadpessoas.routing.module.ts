// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadpessoasComponent } from "./cadpessoas.component";

const routes: Routes =[
    { path: '', component: CadpessoasComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class CadpessoasRoutingModule {}
