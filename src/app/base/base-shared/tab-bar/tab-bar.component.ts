import { Component, OnInit, Input, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ContainerTabDirective } from './container-tab.directive';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent implements OnInit {

  @ContentChildren(ContainerTabDirective) containerTab: QueryList<ContainerTabDirective>;

  @Input() tabs: TabBarItem[] = [];
  @Input() tabIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  get templates() {
    if (!isNaN(this.tabIndex)) {
      const tabs = this.containerTab;
      const tabIndex = this.containerTab.toArray()[this.tabIndex];
      if (tabs && tabs.toArray() && tabIndex) {
        return tabIndex.ref;
      }
    } else {
      return null;
    }
  }

  selectTabActive(index) {
    this.tabIndex = index;
  }

}

export interface TabBarItem {
  name: string;
  show: boolean;
}
