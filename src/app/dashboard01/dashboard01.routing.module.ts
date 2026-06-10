// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Dashboard01Component } from "./dashboard01.component";

const routes: Routes =[
    { path: '', component: Dashboard01Component }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class dashboard01RoutingModule {}
