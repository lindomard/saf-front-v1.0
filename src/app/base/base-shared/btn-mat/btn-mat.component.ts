import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-btn-mat',
  templateUrl: './btn-mat.component.html',
  styleUrls: ['./btn-mat.component.scss']
})
export class BtnMatComponent implements OnInit {

@Input('label') label: string;
@Input('color') color: string;
@Input('style') style: string;
@Input('icon') icon: string;

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
