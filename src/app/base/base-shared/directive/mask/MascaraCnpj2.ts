import { Injector, Injectable, Directive, OnInit, forwardRef, Self, Component, HostListener } from '@angular/core';

import { NgControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, AbstractControl, ControlValueAccessor } from '@angular/forms';







@Directive({
    selector: '[appMascaraCnpj2]',
})
export class Cnpj2MaskDirective implements OnInit {

    constructor(public ngControl: NgControl) {
    }

    ngOnInit(): void {
        const originalWriteVal = this.ngControl.valueAccessor.writeValue.bind(this.ngControl.valueAccessor);
        this.ngControl.valueAccessor.writeValue = (val: any) => originalWriteVal(this._maskValue(val,false));

        const originalChange = (<any>this.ngControl.valueAccessor)['onChange'].bind(this.ngControl.valueAccessor);
        this.ngControl.valueAccessor.registerOnChange((val: any) => originalChange(this._unmaskValue(val)));

        this._setVal(this._maskValue(this.ngControl.value,false));
    }



    private _setVal(val: string) {
        if (this.ngControl.control) {
            this.ngControl.control.setValue(val, { emitEvent: false });
        }
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
      this._maskValue(event.target.value, true);
    }
  

    private _maskValue(val: any, backspace): string {

        if (val) {
            let newVal: string = val;

            // console.log('numero que chegou ', val)

            if (!isNaN(val)) {
                newVal = val.toString();
            }

            newVal = newVal.replace(/\D/g, '');

            if (backspace && val.substring(val.length-1)=="-" ) {
                newVal = newVal.substring(0, newVal.length - 1);
              }
          

            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 3) {
                //  newVal = newVal.replace(/^(\d{0,2})/, '($1)');
            } else if (newVal.length <= 6) {
                newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1. $2.');
            } else if (newVal.length <= 10) {
                newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, '$1.$2.$3/');
            } else if (newVal.length <= 12) {
                newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3/$4-');

            } else {
                newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5');
            }

            return newVal;
        }
        return val;
    }

    private _unmaskValue(val: string): string {
        const maskedVal = this._maskValue(val,false);
        const unmaskedVal = this.unmaskValue(maskedVal);

        if (maskedVal !== val) {
            this._setVal(maskedVal);
        }

        return maskedVal ? unmaskedVal : '';

    }

    private unmaskValue(value: string): string {
        if (value) {
            return value.replace(/\D/g, '');;
        }
        return undefined;
    }


}