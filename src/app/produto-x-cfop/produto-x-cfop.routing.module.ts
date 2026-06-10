// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoXCfopComponent } from "./produto-x-cfop/produto-x-cfop.component";

const routes: Routes =[
    { path: '', component: ProdutoXCfopComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class produtoXCfopRoutingModule {}
