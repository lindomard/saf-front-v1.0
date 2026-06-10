import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[listOptions]'
})
export class ListOptinsDirective {

    @Output() handlerTabEvent = new EventEmitter<any>();

    constructor(private elementRef: ElementRef) {}
    
    @HostListener('document:keydown.tab', ['$event'])
    onListenerKeyUp($event) {
        this.handlerTabEvent.emit($event.target.id);
    }
}