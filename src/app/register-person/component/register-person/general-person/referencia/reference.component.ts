import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { TableListComponent, ItemTable } from '@base-shared/table-list/table-list.component';
import { ReferenceForm } from './reference-form';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;
  @Output() instanceHandle = new EventEmitter<ReferenceComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];


  constructor(
    public referenceForm: ReferenceForm,
    private markedTouchedForm: MarkTouchedForm
  ) { }

  ngOnInit() {
    this.initializer();
  }


  private initializer() {
    this.form = this.referenceForm.form;
    this.fields = this.referenceForm.fields;
  }

}
