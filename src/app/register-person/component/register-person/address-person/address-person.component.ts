import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuildConfig } from 'src/app/base/base-shared/form-build/form-build.component';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-person',
  templateUrl: './address-person.component.html',
  styleUrls: ['./address-person.component.scss']
})
export class AddressPersonComponent implements OnInit, AfterContentInit {

  form : UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

}
