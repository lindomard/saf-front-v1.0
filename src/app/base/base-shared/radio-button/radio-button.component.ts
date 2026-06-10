import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() name: string;
  @Input() label: string;
  @Input() items: ItemRadioButton[] = [];
  
  constructor() { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl(''); 
      this.formGroup.addControl(this.name, this.control);
    }
  }

}


export interface ItemRadioButton {
  name: string;
  radioGroup
  value: number;
  label: string;
}