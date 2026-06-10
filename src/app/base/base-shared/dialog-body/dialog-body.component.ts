import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  @Output() handlerClick = new EventEmitter<any>();
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
