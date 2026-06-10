import {Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {FieldContainerComponent} from '../field-build/field-container.component';
import {getFormBuildIndex} from '@base-core/function/form-build-index';
import {safeCall} from "@base-core/safe-call";

export enum FormItemType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  TEXT_AREA = 'TEXT_AREA',
  BTN_RAISED = 'BTN_RAISED',
  BTN_MAT = 'BTN_MAT',
  TEXT_BUTTON = 'TEXT_BUTTON',
  GENESIS_BUTTON = 'GENESIS_BUTTON',
  DATEPICKER = 'DATEPICKER',
  GENESIS_CALENDAR = 'GENESIS_CALENDAR',
  INPUT_BUTTON = 'INPUT_BUTTON',
  INPUT_BUTTON_ENABLE = 'INPUT_BUTTON_ENABLE',
  TITLE = 'TITLE',
  CHECKBOX = 'CHECKBOX',
  RADIO_BUTTON = 'RADIO_BUTTON',
  SPACE = 'SPACE',
  DIVIDER = 'DIVIDER',
  LIST_GROUP = 'LIST_GROUP',
  INPUT_MONEY = 'INPUT_MONEY',
  INPUT_ALPHANUMERIC = 'INPUT_ALPHANUMERIC',
  INPUT_BUTTON_ALPHANUMERIC = 'INPUT_BUTTON_ALPHANUMERIC',
  INPUT_NAME_FILE = 'INPUT_NAME_FILE'
}

export interface FormBuildConfig {
  control?: UntypedFormControl;
  type: FormItemType;
  columnXl?: number;
  columnLg?: number;
  columnMd?: number;
  columnSm?: number;
  params?: any;
  clickEvent?: Function;
  handlerChange?: Function;
  handlerSelected?: Function;
  handlerBlur?: Function;
  keyDown?: Function;
  handlerTab?: Function;
  
  name?: string;
}

const CONTROL = 'control';
const CLICK = 'click';
const HANDLER_CHANGE_FUNCTION = 'handlerChangeFunction';
const HANDLER_SELECT = 'handleSelected';
const HANDLER_BLUR = 'handlerBlur';
const HANDLER_TAB = 'handlerTab';
const HANDLER_KEYDOWN = 'keyDown';

@Component({
  selector: 'app-form-build-not-row',
  templateUrl: './form-build-not-row.component.html',
  styleUrls: ['./form-build-not-row.component.scss']
})
export class FormBuildNotRowComponent implements OnInit {

  @Input('fieldsConfig') fieldsConfig: FormBuildConfig[] = [];
  @ViewChildren(FieldContainerComponent) fields: QueryList<FieldContainerComponent>;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.injectParams();
    });
  }

  private injectParams() {
    this.fields.forEach((field, index) => {
      const fieldConfig = this.fieldsConfig[index];

      safeCall(fieldConfig.control, (it) => {
        field.instanceRef[CONTROL] = it;
      });

      safeCall(fieldConfig.clickEvent, (it) => {
        field.instanceRef[CLICK] = it;
      });

      safeCall(fieldConfig.handlerChange, (it) => {
        field.instanceRef[HANDLER_CHANGE_FUNCTION] = it;
      });

      safeCall(fieldConfig.handlerSelected, (it) => {
        field.instanceRef[HANDLER_SELECT] = it;
      });

      safeCall(fieldConfig.handlerBlur, (it) => {
        field.instanceRef[HANDLER_BLUR] = it;
      });

      safeCall(fieldConfig.keyDown, (it) => {
        field.instanceRef[HANDLER_KEYDOWN] = it;
      });

      safeCall(fieldConfig.handlerTab, (it) => {
        field.instanceRef[HANDLER_TAB] = it;
      });

      const params = fieldConfig.params;
      if (params) {
        for (const param in params) {
          if (params.hasOwnProperty(param)) {
            field.instanceRef[param] = params[param];
          }
        }
      }
    });
  }

  setInjectParam(position: number, params?: any) {
    const field = this.fields.find((_, index) => index == position);
    if (params) {
      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          field.instanceRef[param] = params[param];
        }
      }
    }
    this.fields.notifyOnChanges();
  }

  setInjectParamWithName(name: string, fields: FormBuildConfig[], params?: any) {
    const positionIndex = getFormBuildIndex(name, fields);
    const field = this.fields.find((_, index) => index == positionIndex);
    if (params) {
      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          field.instanceRef[param] = params[param];
        }
      }
    }
    this.fields.notifyOnChanges();
  }

  setFocus(name: string, fields: FormBuildConfig[]) {
    const positionIndex = getFormBuildIndex(name, fields);
    const field = this.fields.find((_, index) => index == positionIndex);
    field.instanceRef.setFocus();
  }

  getColumns(cf: FormBuildConfig) {
    return `col-xl-${cf.columnXl || 12}
            col-lg-${cf.columnLg || 12}
            col-md-${cf.columnMd || 12}
            col-sm-${cf.columnSm || 12}`;
  }

}
