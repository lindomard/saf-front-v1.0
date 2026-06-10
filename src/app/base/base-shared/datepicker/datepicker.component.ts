import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
declare var $;

import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input('id') id;
  @Input('name') name;
  @Input('label') label;
  @Input('required') required = false;
  @Input('formGroup') formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input('control') control: UntypedFormControl;
  @Input('message') message: string;
  @Input('maxDate') maxDate: Date;
  @Input('minDate') minDate: NgbDateStruct = {year: 1918, month: 1, day: 1};
  @Input('maskText') maskText: string = '99/99/9999';
  @Input('placeholder') placeholder; 
  @ViewChild('dp', {static: true}) dp;


  open= false;
  limitDate: any = null;

  constructor(
    private elementref: ElementRef
  ) { }

  ngOnInit() {
    this.elementref.nativeElement.id = this.id;

    this.configureDatepickerClose();
    this.dp.placement = 'left';
    if (!this.control) {
      this.control = new UntypedFormControl('', []);
      this.formGroup.addControl(this.name, this.control);
    }
    this.setLimitedDate();
  }

  private configureDatepickerClose() {
    fromEvent(window, 'click').subscribe($event => {
      const target = $($event.target);
      const internalClick = target.closest('app-datepicker').length;
      if (!internalClick) {
        this.dp.close();
        this.open = false;
      }
    });
  }

  blurHandler() {
    const value = this.control.value;
    const momentDate = moment(parseInt(value, 10));
    if (value && !momentDate.isValid()) {
      this.control.reset();
    }
  }

  calendarClickHandler($event) {
    $event.stopPropagation();
    if (!this.control.disabled) {
      this.dp.toggle();
    }
  }

  get showError() {
    const unset = this.control.value === null;
    return this.required && unset && this.control.touched;
  }

  private setLimitedDate() {
    if (this.maxDate) {
      this.limitDate = {};
      this.limitDate.day = this.maxDate.getDate();
      this.limitDate.month = this.maxDate.getMonth();
      this.limitDate.year = this.maxDate.getFullYear();
    }
  }

}
