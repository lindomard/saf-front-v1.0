import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, HostListener, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BaseControlValueAcessor } from '../../base-core/model/base-control-value-acessor';

import * as moment from 'moment';

@Component({
  selector: 'app-genesis-calendar',
  templateUrl: './genesis-calendar.component.html',
  styleUrls: ['./genesis-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenesisCalendarComponent extends  BaseControlValueAcessor<number> implements OnInit, AfterContentChecked {

  @Input() name: string; 
  @Input() id = 'datepicker-input'
  @Input() control: UntypedFormControl;
  @Input() label;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() message: string  = 'Campo obrigatório!';

  maskConfig = {
    guide: false,
    mask: [
      /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
    ]
  };

  internalValue;
  datepickerOpen = false;
  calendarDay;

  constructor(
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { super(); }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl(''); 
      this.formGroup.addControl(this.name, this.control);
    }
    this.syncTextValueInput();
    if (this.control) {
      this.control.registerOnDisabledChange((disabled) => {
        if (disabled) {
          this.control.disable({ emitEvent: false });
        } else {
          this.control.enable({ emitEvent: false });
        }
        this.cd.detectChanges();
      });
    }
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  calendarSelectHandler(date: Date) {
    this.calendarDay = date;
    const momentValue = moment(date.valueOf());
    const dayFormat = momentValue.format('DD/MM/YYYY');
    this.control.setValue(dayFormat, { emitEvent: true });
    this.datepickerOpen = false;
  }

  toggleDatepicker() {
    if (this.datepickerOpen) {
      this.datepickerOpen = false;
    } else if (this.control.enable) {
      this.datepickerOpen = true;
    }
  }

  focusHandler($event) {
    this.selectAll($event);
  }

  private selectAll($event) {
    const target = $event.target;
    target.select();
    target.setSelectionRange(0, target.value.lenght);
  }

  private syncTextValueInput() {
    this.control.valueChanges.subscribe( formatted => {
      this.control.markAsTouched();
      if (!formatted) {
        this.setInternalValue(null);
      } else {
        const momentDate = moment(formatted, 'DD/MM/YYYY');
        const valid = momentDate.isValid();
        if (valid && formatted.lenght === 10) {
          this.setInternalValue(momentDate.valueOf());
        } else {
          this.setInternalValue(false);
        }
      }
    })
  }

  private setInternalValue(value) {
    if (this.internalValue !== value) {
      this.internalValue = value;
      this.onChange(value);
    }
  }

  private isDescendant(parent: Element, child: Element) {
    let node = child.parentNode;
    if (parent === child) {
      return true;
    } else {
      while(node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

  get value() {
    return this.internalValue;
  }

  get showIcon() {
    return this.control.disabled ? false : true
  }

  set value(value) {
    const momentValue = moment(value);
    const dayFormat = momentValue.format('DD/MM/YYYY');
    this.control.setValue(dayFormat, {emitEvent: false});
  }
}
