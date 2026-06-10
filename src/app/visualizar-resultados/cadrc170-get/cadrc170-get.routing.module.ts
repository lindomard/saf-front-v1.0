import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Cadrc170GetComponent } from "./cadrc170-get/cadrc170-get.component";

const routes: Routes =[
    { path: '', component:  Cadrc170GetComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class cadrc170GetRoutingModule {}
