import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[genesisTab]'
})
export class TabDirective {

  @Input() genesisTab;
  @Input() label;
  @Input() disabledTab;

  constructor(
    private templateRef: TemplateRef<any>
  ) { }

  get ref(): TemplateRef<any> {
    return this.templateRef;
  }
}
