import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, AfterContentChecked {

  @Input('required') required: boolean = false;
  @Input('label') label: String;
  @Input('labelTablet') labelTablet: String;
  @Input('labelMobile') labelMobile: String;

  @Input('control') control: UntypedFormControl;
  @Input('formGroup') formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input('valueKey') valueKey = 'id';
  @Input('labelKey') labelKey = 'name';
  @Input('name') name: string;
  @Input('visible') visible: boolean = true;
  @Input('idComponent') idComponent: string;
  @Input('options') options: ItemSelect[] = [];

  @Output() changeHandle = new EventEmitter<number>();
  @Output() handlerKeyDown = new EventEmitter<any>();
  @Output() tabHandle = new EventEmitter<any>();

  @ViewChild('divSelect', { static: false }) divSelect: ElementRef;
  @ViewChild('instanceRef', { static: false }) instanceRef: ElementRef;

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
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  handlerChangeFunction($event) {

    this.changeHandle.emit();
  }


  keyDown(event) {
    
    
    this.handlerKeyDown.emit();

  }

  getDynamicId() {
    return Math.floor(Math.random() * Math.floor(999999));
  }

  handlerBlur($event) {
    this.tabHandle.emit();

  }

  

  setFocus() {
    this.instanceRef.nativeElement.focus();
    this.cd.detectChanges();
  }




  getOptions() {


      const mobile = 500;
      const tablet = 768;
      const largura = screen.width;
  
    //   console.log('valor do item ',largura<=mobile ? (this.labelMobile ? this.labelMobile : this.label ) 
    //   :  (largura<=tablet ? (this.labelTablet ? this.labelTablet : this.label ) :
    //  this.label ))

      return largura<=mobile ? (this.labelMobile ? this.labelMobile : this.label ) 
           :  (largura<=tablet ? (this.labelTablet ? this.labelTablet : this.label ) :
          this.label );
  
  

  }



    
}

export interface ItemSelect {
  id: number;
  name: string;
}

export interface ItemSelectIdStr {
  id: string;
  name: string;
}


export interface ItemSelectDoc {
  id: number;
  name: string;
  possuiValidade: boolean;
}



