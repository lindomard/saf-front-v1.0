import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlphanumericDirective } from '@base-core/directive/alphanumeric.directive';
import { DndDirective } from '@base-core/directive/dnd.directive';
import { FocusDirective } from '@base-core/directive/focus.directive';
import { ListOptinsDirective } from '@base-core/directive/list-options.directive';
import { NumberDirective } from '@base-core/directive/number.directive';
import { instanceMarkTouchedForm, MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { OptionTransform } from '@base-core/pipes/option-transform.pipe';
import { DatepickerOverviewExampleComponent } from '@base-shared/datepicker-overview-example/datepicker-overview-example.component';
import { MessageComponent } from '@base-shared/message/message.component';
import { RelTipoSeparadoComponent } from '@base-shared/rel-tipo-separado/rel-tipo-separado.component';
import { TableListGenesisComponent } from '@base-shared/table-list-genesis/table-list-genesis.component';
import { TableListUmTercoComponent } from '@base-shared/table-list-um-terco/table-list-um-terco.component';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SafePipeModule } from 'safe-pipe';
import { BtnMatComponent } from './btn-mat/btn-mat.component';
import { BtnRaisedComponent } from './btn-raised/btn-raised.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogQuestionComponent } from './dialog-question/dialog-question.component';
import { ShowDialogQuestion } from './dialog-question/show-dialog-question.component';
import { DialogWarningComponent } from './dialog-warning/dialog-warning.component';
import { ShowDialogWarningComponent } from './dialog-warning/show-dialog-warning.component';
import { ComponentFillDirective } from './directive/component-fill.directive';
import { EventClickDirective } from './directive/event-click.directive';
import { DividerComponent } from './divider/divider.component';
import { FieldContainerComponent } from './field-build/field-container.component';
import { FiltrarCamposParaPlanihasModalComponent } from './filtrar-campos-para-planihas-modal/filtrar-campos-para-planihas-modal.component';
import { FormBuildNotRowComponent } from './form-build-not-row/form-build-not-row.component';
import { FormBuildComponent } from './form-build/form-build.component';
import { GenesisButtonComponent } from './genesis-button/genesis-button.component';
import { GenesisCalendarComponent } from './genesis-calendar/genesis-calendar.component';
import { HeaderButtonComponent } from './header-button/header-button.component';
import { InputButtonEnableComponent } from './input-button-enable/input-button-enable.component';
import { InputDecimaisCustomComponent } from './input-decimais-custom/input-decimais-custom.component';
import { InputDecimaisComponent } from './input-decimais/input-decimais.component';
import { InputFieldAlphanumericComponent } from './input-field-alphanumeric/input-field-alphanumeric.component';
import { InputFieldButtonAlphanumericComponent } from './input-field-button-alphanumeric/input-field-button-alphanumeric.component';
import { InputFieldButtonComponent } from './input-field-button/input-field-button.component';
import { InputFieldNameFileComponent } from './input-field-name-file/input-field-name-file.component';
import { InputFieldNumberComponent } from './input-field-number/input-field-number.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { InputListComponent } from './input-list/input-list.component';
import { InputCurrencyMaskComponent } from './input-mask/input-currency-mask.component';
import { InputComponent } from './input/input.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { LoadingIndicatorComponent } from './loading/component/loading-indicator.component';
import { LoadingIndicatorDirective } from './loading/loading-indicator.directive';
import { MaterialModule } from './meterial/material.module';
import { ProgressBarFullComponent } from './progress-bar-full/progress-bar-full.component';
import { ProgressBarShowComponent } from './progress-bar-full/progress-bar-show.component';
import { ProgressComponent } from './progress/progress.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { ContainerTabDirective } from './tab-bar/container-tab.directive';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabComponent } from './tab/tab.component';
import { TabDirective } from './tab/tab.directive';
import { TableListHoverComponent } from './table-list-hover/table-list-hover.component';
import { TableListComponent } from './table-list/table-list.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TitleComponent } from './title/title.component';
import { CnpjMaskDirective } from './directive/mask/MascaraCnpj';
import { CpfMaskDirective } from './directive/mask/MascaraCpf';
import { BlinkComponent } from './blink/blink.component';
import { FoneMaskDirective, ValidacaoService } from './directive/mask/MascaraFone';
import { Cnpj2MaskDirective } from './directive/mask/MascaraCnpj2';
import { CpfCnpjDirective } from './directive/mask/cpf-cnpj.directive';
import { LoadingV01Component } from './loadingv01/loaddingv01';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ButtonComponent,
    FormBuildComponent,
    FieldContainerComponent,
    InputComponent,
    SelectComponent,
    InputFieldComponent,
    HeaderButtonComponent,
    BtnRaisedComponent,
    BtnMatComponent,
    TabComponent,
    TabDirective,
    GenesisButtonComponent,
    DatepickerComponent,
    InputListComponent,
    GenesisCalendarComponent,
    InputFieldButtonComponent,
    TableListComponent,
    TableListUmTercoComponent,
    EventClickDirective,
    TitleComponent,
    ComponentFillDirective,
    LoadingIndicatorDirective,
    LoadingIndicatorComponent,
    CheckboxComponent,
    DividerComponent,
    TabBarComponent,
    ContainerTabDirective,
    ListGroupComponent,
    FocusDirective,
    DialogBodyComponent,
    InputCurrencyMaskComponent,
    InputButtonEnableComponent,
    RadioButtonComponent,
    TextAreaComponent,
    ProgressBarFullComponent,
    ProgressBarShowComponent,
    DialogQuestionComponent,
    DndDirective,
    ProgressComponent,
    InputFieldNumberComponent,
    NumberDirective,
    DialogWarningComponent,
    ListOptinsDirective,
    AlphanumericDirective,
    InputFieldAlphanumericComponent,
    TableListHoverComponent,
    InputFieldButtonAlphanumericComponent,
    OptionTransform,
    InputFieldNameFileComponent,
    TableListGenesisComponent,
    DatepickerOverviewExampleComponent,
    TableListGenesisComponent,
    FiltrarCamposParaPlanihasModalComponent,
    FormBuildNotRowComponent,
    RelTipoSeparadoComponent,
    InputDecimaisComponent,
    InputDecimaisCustomComponent,
    MessageComponent
    ,Cnpj2MaskDirective
    ,CnpjMaskDirective
    ,CpfMaskDirective
    ,CpfCnpjDirective    
    ,FoneMaskDirective 
    
    ,BlinkComponent
    ,LoadingV01Component
   
    
    
  ]
  ,
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TextMaskModule,
    MaterialModule,
    NgbModalModule,
    NgbDatepickerModule,
    SafePipeModule,
    MatDatepickerModule,
    MatNativeDateModule
    , CurrencyMaskModule
    , QRCodeModule
    ,NgxMaskModule.forRoot({
      showMaskTyped : true,
      // clearIfNotMatch : true
    }) 

    

  ],
    

  exports: [
    ButtonComponent,
    FlexLayoutModule,
    FieldContainerComponent,
    FormBuildComponent,
    InputComponent,
    SelectComponent,
    MaterialModule,
    HeaderButtonComponent,
    BtnRaisedComponent,
    BtnMatComponent,
    TabComponent,
    TabDirective,
    GenesisButtonComponent,
    DatepickerComponent,
    InputListComponent,
    GenesisCalendarComponent,
    InputFieldComponent,
    InputFieldButtonComponent,
    TableListComponent,
    TableListUmTercoComponent,
    EventClickDirective,
    TitleComponent,
    ComponentFillDirective,
    LoadingIndicatorDirective,
    LoadingIndicatorComponent,
    CheckboxComponent,
    DividerComponent,
    TabBarComponent,
    ContainerTabDirective,
    ListGroupComponent,
    FocusDirective,
    DialogBodyComponent,
    InputCurrencyMaskComponent,
    InputButtonEnableComponent,
    RadioButtonComponent,
    TextAreaComponent,
    ProgressBarFullComponent,
    ProgressBarShowComponent,
    DndDirective,
    ProgressComponent,
    InputFieldNumberComponent,
    NumberDirective,
    DialogWarningComponent,
    ListOptinsDirective,
    AlphanumericDirective,
    InputFieldAlphanumericComponent,
    TableListHoverComponent,
    TableListGenesisComponent,
    InputFieldButtonAlphanumericComponent,
    OptionTransform,
    InputFieldNameFileComponent,
    DatepickerOverviewExampleComponent,
    FiltrarCamposParaPlanihasModalComponent,
    SafePipeModule,
    FormBuildNotRowComponent,
    RelTipoSeparadoComponent,
    MessageComponent
    ,CnpjMaskDirective
    ,Cnpj2MaskDirective    
    ,CpfMaskDirective
    ,CpfCnpjDirective
    ,BlinkComponent
    ,FoneMaskDirective 
    ,LoadingV01Component
    ,NgxMaskModule
    


  ]
  ,

  providers: [
    ShowDialogQuestion,
    ShowDialogWarningComponent,

    ValidacaoService,
    

    { provide: MarkTouchedForm, useFactory: instanceMarkTouchedForm },
  ]
})
export class BaseSharedModule { }
