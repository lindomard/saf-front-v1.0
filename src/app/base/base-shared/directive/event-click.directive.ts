import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appEventClick]'
})
export class EventClickDirective {

  @Input() dt;

  constructor(
    private ref: ElementRef
  ) { }

  @HostListener('click', ['$event.target']) mouseEvent() {
    this.ref.nativeElement.disabled = true;
  }

  private setColor(color: string) {
    this.ref.nativeElement.disabled = true;
  }
}
