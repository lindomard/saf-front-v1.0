import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PanelPersonComponent } from './component/panel-person/panel-person.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: PanelPersonComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RegisterRoutingModule {}
