// sel 33
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileViwerComponent } from "./file-viwer.component";


const routes: Routes =[
    { path: '', component: FileViwerComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class FileViwerRoutingModule {}
