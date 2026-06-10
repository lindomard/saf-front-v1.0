import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[loadingIndicator]'
})
export class LoadingIndicatorDirective {

    constructor(private viewContainerRef: ViewContainerRef) {}
}