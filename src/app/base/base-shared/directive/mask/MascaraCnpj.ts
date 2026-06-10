import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appMascaraCnpj]',
})
export class CnpjMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
  

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
      


      newVal = 
      `${newVal.substr(0,2)}.${newVal.substr(2, 3)}.${newVal.substr(5, 3)}/${newVal.substr(8, 4)}-${newVal.substr(12)}`
      
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
