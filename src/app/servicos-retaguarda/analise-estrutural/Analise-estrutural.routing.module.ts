import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnaliseEstruturalComponent } from "./analise-estrutural.component";

const routes: Routes =[
    { path: '', component:   AnaliseEstruturalComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class AnaliseEstruturalRoutingModule {}
