import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRowKeyboardSelectionDirective } from './mat-row-keyboard-selection.directive';



@NgModule({
  declarations: [MatRowKeyboardSelectionDirective],
  imports: [
    CommonModule
  ],
  exports: [MatRowKeyboardSelectionDirective]
})
export class MatRowKeyboardSelectionModule { }
