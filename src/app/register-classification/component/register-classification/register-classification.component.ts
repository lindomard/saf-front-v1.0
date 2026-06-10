import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


export enum TabRegisterClassificationName {
  TAB_CATEGORY = 0,
  TAB_DEPARTMENT = 1,
  TAB_GROUP = 2,
  TAB_SUB_GROUP = 3,
  TAB_TYPE = 4,
}

@Component({
  selector: 'app-register-classification',
  templateUrl: './register-classification.component.html',
  styleUrls: ['./register-classification.component.scss']
})
export class RegisterClassificationComponent implements OnInit {

  selectedTabName = new FormControl(TabRegisterClassificationName.TAB_CATEGORY)

  constructor() { }

  ngOnInit() {
  }

}
