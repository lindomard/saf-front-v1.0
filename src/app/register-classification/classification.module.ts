import { NgModule } from "@angular/core";
import { PanelClassficationComponent } from './component/panel-classfication/panel-classfication.component';
import { CommonModule } from "@angular/common";
import { BaseSharedModule } from "@base-shared/base-shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClassificationRoutingModule } from "./classification-routing.module";
import { RegisterClassificationComponent } from './component/register-classification/register-classification.component';
import { CategoryComponent } from './component/register-classification/category/category.component';
import { CategoryForm } from "./component/register-classification/category/category-form";
import { DepartmentComponent } from './component/register-classification/department/department.component';
import { DepartmentForm } from "./component/register-classification/department/department-form";
import { GroupComponent } from './component/register-classification/group/group.component';
import { GroupForm } from "./component/register-classification/group/group-form";
import { SubGroupComponent } from './component/register-classification/sub-group/sub-group.component';
import { SubGroupForm } from "./component/register-classification/sub-group/sub-group-form";
import { TypeComponent } from './component/register-classification/type/type.component';
import { TypeForm } from "./component/register-classification/type/type-form";
import { ExtraTypeComponent } from './component/register-classification/extra-type/extra-type.component';
import { ExtraTypeForm } from "./component/register-classification/extra-type/extra-type-form";


@NgModule({
  declarations: [
      PanelClassficationComponent,
      RegisterClassificationComponent,
      CategoryComponent,
      DepartmentComponent,
      GroupComponent,
      SubGroupComponent,
      TypeComponent,
      ExtraTypeComponent,
    ],
  imports: [
    CommonModule,
    BaseSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ClassificationRoutingModule
    ],
  exports: [],
  providers: [
      CategoryForm,
      DepartmentForm,
      GroupForm,
      SubGroupForm,
      TypeForm,
      ExtraTypeForm
  ] 
})
export class ClassificationModule {}