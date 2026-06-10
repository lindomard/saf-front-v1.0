import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: '[appHideMe]'
})
export class HideMeDirective implements AfterViewInit {

  @Input() appHideMe: string;

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    
    if (this.appHideMe === 'hide') {
      this.el.nativeElement.style.display = 'none';
    }
    // should be displayed
    // this.el.nativeElement.style.display = 'none';
  }
}