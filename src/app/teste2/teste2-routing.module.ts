import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Teste2Component } from "src/app/teste2/teste2.component";

const routes: Routes =[
    { path: '', component: Teste2Component }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})

export class Teste2RoutingModule {}