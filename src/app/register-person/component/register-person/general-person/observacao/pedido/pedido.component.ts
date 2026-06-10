import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ObsPedidoForm } from '@register/control-forms/obs-pedido-form';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(private obsPedidoForm: ObsPedidoForm) { }

  ngOnInit() {
    this.initialazer();
  }

  private initialazer() {
    this.form = this.obsPedidoForm.form;
    this.fields = this.obsPedidoForm.fields;
  }
}
