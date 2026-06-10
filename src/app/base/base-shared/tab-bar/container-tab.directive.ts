import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[containerTab]',
})
export class ContainerTabDirective {

  constructor(private templateRef: TemplateRef<any>) { }
  
  get ref(): TemplateRef<any> {
    return this.templateRef;
  }
}