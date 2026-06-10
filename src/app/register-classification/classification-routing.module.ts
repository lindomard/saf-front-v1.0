import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelClassficationComponent } from './component/panel-classfication/panel-classfication.component';

const routes: Routes =[
    { path: '', component: PanelClassficationComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class ClassificationRoutingModule {}