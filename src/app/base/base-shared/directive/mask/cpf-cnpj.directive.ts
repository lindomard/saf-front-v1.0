import { Directive, ElementRef, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CpfCnpjService } from '../servicos/cpf-cnpj.service';

@Directive({
  selector: '[appCpfCnpj]'
})
export class CpfCnpjDirective {

  @HostBinding('class.is-invalid') cpfCnpjInvalid:boolean
  @HostBinding('class.is-valid') cpfCnpjValid:boolean
  
  service: CpfCnpjService = new CpfCnpjService();
 
  constructor(private el: ElementRef,
              private control: NgControl) {}

  @HostListener('input', ['$event']) onEvent($event) {
    let value: any = this.service
                           .createMask(this.el.nativeElement.value);
    this.control.control.setValue(value);
      
    this.validate(value);
  }

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode == 9 || (e.shiftKey && e.keyCode == 9)) {
      let value: any = this.service
                           .createMask(this.el.nativeElement.value);
      this.control.control.setValue(value);
      
      this.validate(value);
    }
  }

  validate(str) {
    let value = str;
    // add mask cpfCnpj
    
    if (value.length === 18) {
      if (this.service.validateCNPJ(value)) {
        this.cpfCnpjInvalid = false;
        this.cpfCnpjValid = true;
      } else {
        this.cpfCnpjInvalid = true;
        this.cpfCnpjValid = false;
      }
    } else if (value.length === 14) {
      if (this.service.validateCPF(value)) {
        this.cpfCnpjInvalid = false;
        this.cpfCnpjValid = true;
      } else {
        this.cpfCnpjInvalid = true;
        this.cpfCnpjValid = false;
      }
    }
  }

  
  


}