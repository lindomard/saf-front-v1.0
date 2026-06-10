import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuildConfig } from '../form-build/form-build.component';

@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss']
})
export class FieldContainerComponent implements OnInit {

  @Input() config: FormBuildConfig;
  @ViewChild('instanceRef', {static: false}) instanceRef;

  constructor() { }

  ngOnInit() {
    this.instanceRef;
  }

}
