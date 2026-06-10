import { Component, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-decimais',
  templateUrl: './input-decimais.component.html',
  styleUrls: ['./input-decimais.component.scss']
})
export class InputDecimaisComponent implements OnChanges {

  @Input() label: string = 'Label';
  @Input() numeroCasasDecimais: number = 3;
  @HostBinding('attr.tabindex') @Input() tabindex: number|string = 0;

  digitsInfo: string = `1.${this.numeroCasasDecimais}-${this.numeroCasasDecimais}`;
  valor: number = 0;  
  valorTexto: string = '';
   
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numeroCasasDecimais) {
      this.digitsInfo =
        `1.${this.numeroCasasDecimais}-${this.numeroCasasDecimais}`;
    }
    
    if (changes.tabindex) {
      this.tabindex = +this.tabindex;
    }
  }

  @HostListener('keydown', ['$event.key'])  
  hostKeydown(key: string) { 
  
    const teclasAceitas = /^(\d)|(Backspace)$/;
    if (!teclasAceitas.test(key)) {
      return;
    }
    
    if (key === 'Backspace') {
      key = '';
      this.valorTexto = this.valorTexto
        .substr(0, this.valorTexto.length - 1);
    } else if (!/\d/.test(key)) {
      return; 
    }

    this.valorTexto += key; 

    if (+this.valorTexto === 0) {
      this.valorTexto = '';
    }    

    this.valor = +(this.valorTexto) / 
                 (100 * Math.pow(10, this.numeroCasasDecimais));

  }
}

