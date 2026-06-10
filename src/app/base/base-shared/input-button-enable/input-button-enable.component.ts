import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-button-enable',
  templateUrl: './input-button-enable.component.html',
  styleUrls: ['./input-button-enable.component.scss']
})
export class InputButtonEnableComponent implements OnInit {

  @Input() name: string;  
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() icon: string;
  @Input() mask;
  @Input() placeholder;
  @Input() message: string = 'Informe um valor valido';

  @Output() clickHandler = new EventEmitter<any>()

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

  click() {
    this.clickHandler.emit();
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

}
