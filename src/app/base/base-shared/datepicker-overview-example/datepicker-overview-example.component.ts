import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { parse } from 'date-fns';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerOverviewExampleComponent),
  multi: true
};

const noop = () => {
};

/** @title Basic datepicker */
@Component({
  selector: 'intersys-datepicker-overview-example',
  templateUrl: './datepicker-overview-example.component.html',
  styleUrls: ['./datepicker-overview-example.component.scss'],


  providers: [

    
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
})

export class DatepickerOverviewExampleComponent implements ControlValueAccessor {
  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };


  innerValue: Date = new Date();

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  @Input() placeholder2: String;
  @Output() blur : EventEmitter<any> = new EventEmitter<any>();
  

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  date: Date = null;

  //get accessor
  get value(): Date {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: Date) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    // console.log(event);
    this.value = event;
    this.onBlur();
  }
    
  todate(value){
    const data = {
      value: value
    }
    this.date = parse(data.value, 'dd/MM/YYYY', new Date());    
    this.value = this.date;
//    this.value = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
    this.blur.emit();
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */