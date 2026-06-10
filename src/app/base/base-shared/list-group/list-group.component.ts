import { Component, OnInit, Input, Injectable } from '@angular/core';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() id = 'id';
  @Input() summary = 'summary';
  @Input() title: string;

  constructor() { }

  ngOnInit() {

  }

}