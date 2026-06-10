import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputListComponent implements OnInit, AfterContentChecked {

  @Input() name: string;  
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() type: string = 'text';
  @Input('labelKey') labelKey = 'name';
  @Input() label: string;
  @Input() options: any[] = [];
  @Input() icon: string ='search';
  @Output() handlerOptionSelect = new EventEmitter<String>();
  
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl(''); 
      this.formGroup.addControl(this.name, this.control);
    }
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  handlerChangeFunction($event) {
    this.handlerOptionSelect.emit($event);
  }
}
