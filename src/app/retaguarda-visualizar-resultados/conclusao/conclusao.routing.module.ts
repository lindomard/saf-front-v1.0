import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConclusaoComponent } from "./conclusao.component";

const routes: Routes =[
    { path: '', component:  ConclusaoComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class ConclusaoRoutingModule {}
