import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
      <div *ngIf="isError" class="balao"> {{ message }} </div>
  `,
  styles: [`
  .balao {
    background-color:#C62828;
    border-top:10px solid #C62828;
    border-left:10px solid transparent;
    background-clip: padding-box;
    padding: 0 10px 10px 10px;
    color: white;
    position:absolute;
    left:50%;
    align-content: center;
}
  `]
})
export class MessageComponent {
  @Input() isError: Boolean;
  @Input() message: String;
}
