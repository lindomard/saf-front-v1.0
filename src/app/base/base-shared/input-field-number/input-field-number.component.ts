import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, AfterContentChecked, HostListener } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field-number',
  templateUrl: './input-field-number.component.html',
  styleUrls: ['./input-field-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldNumberComponent implements OnInit, AfterContentChecked {


  @Input() name: string;  
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() message: String = 'Campo obrigatório!';
  @Input() showCount = false;
  @Input() messageDigits;
  @Input() onFocus;

  marginTop = false;
  
  @Output() changeHandler = new EventEmitter<any>();

  @ViewChild("field", {static: true}) field: ElementRef;
  
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
    this.marginTop = this.label === undefined ? true : false;
    this.setFocus();
    this.cd.detectChanges();
  }
  
  handlerChangeFunction($event) {
    this.changeHandler.emit($event);
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

  private setFocus() {
    if (this.onFocus) {
      setTimeout(() => {
        this.field.nativeElement.focus();
      }, 0);
    }
  }

}
