import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { GroupForm } from './group-form';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];


  constructor(
    private groupForm: GroupForm
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.groupForm.form;
    this.fields = this.groupForm.fields;
  }

}
