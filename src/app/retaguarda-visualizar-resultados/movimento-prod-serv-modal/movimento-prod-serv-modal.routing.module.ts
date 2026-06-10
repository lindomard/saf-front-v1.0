import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovimentoProdServModalComponent } from "./movimento-prod-serv-modal.component";

const routes: Routes =[
    { path: '', component:  MovimentoProdServModalComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class MovimentoProdServModalRoutingModule {}
