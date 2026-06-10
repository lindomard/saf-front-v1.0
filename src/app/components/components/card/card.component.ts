import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
/*
import { createAction, Store } from '@ngrx/store';
import { Crumb } from 'src/app/@core/intefaces/breadcrumb-interface';
import { select } from '@ngrx/store';
import * as fromStore from 'src/app/@core/store';
import { Action, Actions } from 'src/app/@core/enums/action-enum';
import { Observable, Subscription, distinctUntilChanged, filter, firstValueFrom, of, tap } from 'rxjs';

*/
@Component({
  selector: 'ge-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('title') title: string | undefined;
  
  @Input('justify') justify: string = 'initial';

  constructor(private router: Router) { }

  actionSubscription!: Subscription
  

  ngOnInit(): void {

  }
}
