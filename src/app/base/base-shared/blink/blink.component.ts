import { Component, OnInit,Input, OnDestroy, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/mapTo';

@Component({
  selector: 'blink',
  template: `<ng-content></ng-content>`
})
export class BlinkComponent implements OnInit, OnDestroy {
  private blinker$: Observable<string>;

  @Input() active: boolean = true;
  @Input() visibleMS: number = 0;
  @Input() inVisibleMS: number = 2000;
  @Input() totalMS: number = 4000;

  @HostBinding('style.visibility')
  public visibility: string;

  constructor() {
    // Visible for 750 ms and then invisible for 250 ms, for a total period of 1 second.
    const show$ = Observable.timer(this.visibleMS, this.totalMS);
    const hide$ = Observable.timer(this.inVisibleMS, this.totalMS);

    this.blinker$ = Observable.merge(
      show$.mapTo('visible'),
      hide$.mapTo('hidden')
    );
  }

  ngOnInit() {
    this.blinker$
      .takeWhile(() => this.active)
      .subscribe((newVisiblity: string) => this.visibility = newVisiblity);
  }

  ngOnDestroy() {
    this.active = false;
  }

}