import { Directive, ComponentFactoryResolver, Input } from '@angular/core';
import { SearchPersonComponent } from '@register/component/search-person/search-person.component';
import { PanelPersonComponent } from '@register/component/panel-person/panel-person.component';

@Directive({
    selector: '[componentFill]'
})
export class ComponentFillDirective {

    @Input() component: any;

    get ref(): any {
        return this.component;
    } 
}