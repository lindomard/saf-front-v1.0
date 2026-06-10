import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';
@Component({
  selector: 'app-input-field-alphanumeric',
  templateUrl: './input-field-alphanumeric.component.html',
  styleUrls: ['./input-field-alphanumeric.component.scss']
})
export class InputFieldAlphanumericComponent implements OnInit {
  customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };
  
  @Input() name: string;
  @Input() control: UntypedFormControl;
  @Input() formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() mask;
  @Input() placeholder: string;
  @Input() message: String = 'Campo obrigatório!';
  @Input() showCount = false;
  @Input() messageDigits;
  @Input() onFocus;
  @Input() options: ItemOptionList[] = [];
  @Input() labelValue: string = 'value';
  @Input() regex = /[^a-zA-Z0-9]/g;
  // /[^a-zA-Z0-9.:;-\s]/g
  
  @Output() changeHandler = new EventEmitter<any>();
  @ViewChild('instanceRef', { static: true }) inputInstance: ElementRef;
  
  marginTop = false;
  showDataList: boolean = false;

  private handlerItemSelected: { (item): ItemOptionList };
  private handlerBlurAction: { (): string };

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.control) {
      this.control = new UntypedFormControl('');
      this.formGroup.addControl(this.name, this.control);
    }
  }

  ngAfterContentChecked() {
    this.marginTop = this.label === undefined ? true : false;
    this.cd.detectChanges();
  }

  handlerChangeFunction($event) {
    this.changeHandler.emit($event);
  }

  handlerBlur() {
    return () => this.handlerBlurAction();
  }

  handleSelected(item: ItemOptionList) {
    return () => this.handlerItemSelected(item);
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
    if (isList && element.id == this.name) {
      this.showDataList = true;
      this.cd.detectChanges();
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

  @HostListener('window:click', ['$event.target'])
  onClickListenerWindow(target) {
    const isList = this.isDescendant(this.inputInstance.nativeElement, target);
    if (!isList) {
      this.showDataList = false
    }
  }

  get showError() {
    return this.control.touched && this.control.invalid;
  }

  setFocus() {
      setTimeout(() => {
        this.inputInstance.nativeElement.focus();
        this.cd.detectChanges();
      }, 500);
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
