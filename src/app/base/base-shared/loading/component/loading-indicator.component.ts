import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingIndicatorDirective } from '../loading-indicator.directive';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {

  @ViewChild(LoadingIndicatorDirective, {static: true}) indicator: LoadingIndicatorDirective;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
