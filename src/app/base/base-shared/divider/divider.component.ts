import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: `
    <hr class="divider-solid">
  `,
  styles: [`
  .divider-solid {
    border-top: 1px solid #9e9e9e;;
  }`
]
})
export class DividerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
