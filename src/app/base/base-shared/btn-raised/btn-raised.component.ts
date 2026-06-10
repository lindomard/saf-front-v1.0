import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-btn-raised',
  templateUrl: './btn-raised.component.html',
  styleUrls: ['./btn-raised.component.scss']
})
export class BtnRaisedComponent implements OnInit {

  @Input('label') label: string;
  @Input('color') color: string = 'primary';
  @Input('toolTip') toolTip: string;
  @Input('toolTipPosition') toolTipPosition: string;//'below', 'above', 'left', 'right'
  @Input('style') style: object = { 'margin-top': '1.4rem'};
  @Input('icon') icon: string;
  @Input('form') form: UntypedFormGroup;

  @Output('clickEvent') clickEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getStyle() {
    return this.style;
  }

  click() {
    this.clickEvent.emit();
  }
}
