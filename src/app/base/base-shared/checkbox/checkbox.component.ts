import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() valueKey: 0;
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() name: string;
  @Input() label: string;
  @Input() typeLabel = 'normal'
  
  constructor() { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl(''); 
      this.formGroup.addControl(this.name, this.control);
    }
  }

}