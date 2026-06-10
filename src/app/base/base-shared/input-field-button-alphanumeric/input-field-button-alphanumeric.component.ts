import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

const TAB_CODE = 9;
@Component({
  selector: 'app-input-field-button-alphanumeric',
  templateUrl: './input-field-button-alphanumeric.component.html',
  styleUrls: ['./input-field-button-alphanumeric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldButtonAlphanumericComponent implements OnInit, AfterContentChecked {

  @Input() name: string = 'name';
  @Input() idList: string = 'idList';
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() icon: string = 'search';
  @Input() mask;
  @Input() placeholder;
  @Input() labelKey: string = 'id';
  @Input() labelValue: string = 'value';
  @Input() message: string = 'Informe um valor valido';
  @Input() options: ItemOptionList[] = [];
  @Input() regex: RegExp = /[^a-zA-Z0-9]/g;

  @Output() clickHandler = new EventEmitter<any>()
  @Output() changeHandle = new EventEmitter<any>();

  @ViewChild('instanceRef', { static: true }) inputInstance: ElementRef;

  private handlerItemSelected: { (item): ItemOptionList };
  private handlerBlurAction: { (): void };

  showDataList: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private ref: ElementRef
  ) { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl('');
      this.formGroup.addControl(this.name, this.control);
    }
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  click() {
    this.clickHandler.emit();
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

  handlerChangeFunction() {
    this.changeHandle.emit();
  }

  onFocusListener() {
    const element: Element = this.inputInstance.nativeElement;
    if (this.options.length > 0 && element.id == this.name) {
      this.showDataList = true;
      this.cd.detectChanges();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUpListener($event) {
    const isList = this.isDescendant(this.inputInstance.nativeElement, $event.target);
    const element: Element = this.inputInstance.nativeElement;
    if (isList && this.options.length > 0 && element.id == this.name) {
      this.showDataList = true;
      this.cd.detectChanges();
    }
  }

  @HostListener('click', ['$event.target'])
  onClickListenerWindow(target) {
    const isList = this.isDescendant(this.inputInstance.nativeElement, target);
    if (!isList) {
      this.showDataList = false
    }
  }

  onListenerTabEvent($event) {
    if ($event == this.name) {
      setTimeout(() => {
        this.showDataList = false;
        this.cd.detectChanges();
      });
    }
  }

  handleSelected(item: ItemOptionList) {
    return () => this.handlerItemSelected(item);
  }

  handlerBlur() {
    return () => this.handlerBlurAction();
  }

  private isDescendant(parent: Element, child: Element) {
    let node = child.parentNode;
    if (parent === child) {
      return true;
    } else {
      while (node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }
}

export interface ItemOptionList {
  id: number;
  value: string;
}