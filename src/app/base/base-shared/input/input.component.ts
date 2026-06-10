import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input('label') label: string;
  @Input('nome') nome: string;
  @Input('placeholder') placeholder: string;
  @Input('message') message: string;
  @Input('control') control: UntypedFormControl;
  @Input('formGroup') formGroup: UntypedFormGroup = new UntypedFormGroup({});
  @Input('validatores') validatores: ValidatorFn[] = [];
  @Input('required') required: boolean;
  @Input('column') column: string = '2';
  @Input('type') type: string ;
  // https://github.com/text-mask/text-mask/tree/master/angular2
  @Input('mask') mask: string; 
  @Input('obrigatorio') obrigatorio: boolean;

  @ViewChild('input', { static: true }) input;

  ngOnInit(): void {
      if (!this.control) {
          this.control = new UntypedFormControl(null, this.validatores);
          this.formGroup.addControl(this.nome, this.control);
      }
  }

  getColSize(col: string): string {
      return `col-sm-${col}`
  }

  get showError() {
      if (this.obrigatorio) {
        return true;
      } else if (this.control) {
        return !this.control.valid && this.control.touched;
      } else {
        return false;
      }
    }

    focus() {
        this.input.nativeElement.focus();
    }





}


