import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  @Input() showNew: boolean = false;
  @Output() newHandler = new EventEmitter<any>();
 
  @Input() showCancel: boolean = true;
  @Output() cancelHandler = new EventEmitter<any>();

  @Input() showSave: boolean = true;
  @Output() saveHandler = new EventEmitter<any>();

  @Input() showUpdate: boolean = true;
  @Output() updateHandler = new EventEmitter<any>();

  @Input() showDelete: boolean = true;
  @Output() deleteHandler = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  actionNew() {
    this.showSave = false;
    this.showCancel = false;
    this.showDelete = true;
    this.showUpdate = true;
    this.showNew = true;
    this.newHandler.emit();
  }

  actionCancel() {
    this.showNew = false;
    this.showSave = true;
    this.showCancel = true;
    this.cancelHandler.emit();
  }

  actionUpdate() {
    this.updateHandler.emit();
  }

  actionDelete() {
    this.deleteHandler.emit();
  }

  actionSave() {
    this.saveHandler.emit();
  }

  selectedItem() {
    this.showSave = false;
    this.showDelete = false;
    this.showUpdate = false;
    this.showNew = true;
  }

}
