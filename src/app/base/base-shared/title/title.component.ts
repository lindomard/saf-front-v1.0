import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() label;
  @Input() margin = false;
  @Input() marginStart = false;
  @Input() divider = true;
  @Input() typeTitle: TypeTitle = TypeTitle.TITLE;

  constructor() { }

  ngOnInit() {
  }

}

export enum TypeTitle {
  TITLE  = 'TITLE',
  TITLE_DIVIDER  = 'TITLE_DIVIDER',
}
