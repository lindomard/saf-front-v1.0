import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-genesis-button',
  templateUrl: './genesis-button.component.html',
  styleUrls: ['./genesis-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenesisButtonComponent implements OnInit, AfterViewChecked {

  @Input('disabled') disabled = false;
  @Input('label') label = 'button';
  @Input('id') id;
  @Input('large') large = false;
  @Input('full') full = false;
  @Input('primary') primary = true;
  @Input('icon') icon: string;
  @Input('style') style;
  @Input('iconStyle') iconStyle;
  @Input('showLoading') showLoading = false;
  @Input('form') form: UntypedFormGroup;

  @Output() clickHandler = new EventEmitter<any>()

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  click() {
    this.clickHandler.emit();
  }

}
