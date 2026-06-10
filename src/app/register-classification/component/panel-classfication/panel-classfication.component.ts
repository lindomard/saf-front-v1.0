import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

export enum TabPanelClassification {
  TAB_SEARCH = 0,
  TAB_REGISTEr = 1
}

@Component({
  selector: 'app-panel-classfication',
  templateUrl: './panel-classfication.component.html',
  styleUrls: ['./panel-classfication.component.scss']
})
export class PanelClassficationComponent implements OnInit {

  selectedTabName = new UntypedFormControl(TabPanelClassification.TAB_SEARCH);

  constructor() { }

  ngOnInit() {
  }

}
