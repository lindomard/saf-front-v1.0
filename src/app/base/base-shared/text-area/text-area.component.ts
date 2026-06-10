import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() label: string;
  @Input() rows: string;
  @Input() name: string = 'name';
  @Input() control: UntypedFormControl;
  @Input() form = new UntypedFormGroup({});
  @Input() messageDigits;
  @Input() showCount = false;
  @Input() message: string = 'Informe um valor valido';
  marginTop = false;

  constructor() { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl(null);
      this.form.addControl(this.name, this.control);
    }
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

}
