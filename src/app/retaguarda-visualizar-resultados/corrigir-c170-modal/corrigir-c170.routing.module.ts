import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CorrigirC170ModalComponent } from "./corrigir-c170-modal.component";

const routes: Routes =[
    { path: '', component:  CorrigirC170ModalComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class CorrigirC170RoutingModule {}
