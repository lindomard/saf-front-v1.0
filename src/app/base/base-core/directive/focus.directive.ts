import { Directive, Input, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
    selector: 'input[appFocus]'
})
export class FocusDirective implements AfterContentInit{

    @Input('onFocus') focused: boolean = false;
    
    constructor(public element: ElementRef<HTMLElement>) {}

    ngAfterContentInit(): void {
        if (this.focused) {
            setTimeout(() => this.element.nativeElement.focus(), 0)
        }
    }
}