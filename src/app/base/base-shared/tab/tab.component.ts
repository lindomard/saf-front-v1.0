import { 
  Component, 
  OnInit, 
  ContentChildren,
  QueryList, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  AfterContentChecked, 
  AfterViewInit, 
  Output, 
  EventEmitter, 
  Input,
} from '@angular/core';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class TabComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;
  @Output() activeTab = new EventEmitter<string>();

  @Input() tabIndex = 0;
  tabId;
  tabGenesis: TabGenesis[] =[];

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  get template() {
    if (!isNaN(this.tabIndex)) {
      const tabs = this.tabs;
      if (tabs && tabs.toArray()) {
        return this.tabs.toArray()[this.tabIndex].ref;
      }
    } else {
      return null;
    }
  }

  ngAfterViewInit() {
    this.tabClickHandler(null, 0);
  }

  ngAfterContentChecked() {
    this.fetchTabsNames();
    this.cd.detectChanges();
  }

  tabClickHandler($event: MouseEvent, index: number) {
    this.tabIndex = index;
    const tabId =  this.tabs.toArray()[index].genesisTab;
    this.tabId = tabId;
    this.activeTab.emit(tabId);
  }

  selectTabActive(index: number) {
    this.tabIndex = index;
    const tabId =  this.tabs.toArray()[index].genesisTab;
    this.tabId = tabId;
  }

  fornceUpdate() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  private fetchTabsNames() {
    if (this.tabs) {
      this.tabGenesis = [];
      this.tabs.forEach(tab => {
        const name = { 
          name: tab.label ? tab.label : '', 
          disabledTab: tab.disabledTab === undefined ? false : true
        };
        this.tabGenesis.push(name);
      })
    }
  }
}

export interface TabGenesis {
  name: String,
  disabledTab?: boolean;
}
