// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocModalComponent } from "./doc-modal.component";

const routes: Routes =[
    { path: '', component: DocModalComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class DocModalRoutingModule {}
