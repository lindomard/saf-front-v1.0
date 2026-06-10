import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { CategoryForm } from './category-form';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private categoryForm: CategoryForm
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.fields = this.categoryForm.fields;
    this.form = this.categoryForm.form;
  }

}
