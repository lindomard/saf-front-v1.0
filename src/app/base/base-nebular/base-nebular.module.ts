import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '@base-shared/progress-bar/progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbCardModule, NbDialogModule, NbLayoutModule, NbSpinnerModule, NbThemeModule } from '@nebular/theme';
import { ProgressBarNebularComponent } from './progress-bar-nebular/progress-bar-nebular.component';
import { ModalDemoComponent } from './component/modal-demo-component';



@NgModule({
  declarations: [ProgressBarNebularComponent,ModalDemoComponent ],
  imports: [


    
//    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbDialogModule.forRoot(),
    NbSpinnerModule,

  //   CommonModule,
  //   BrowserAnimationsModule,
  //   NbThemeModule.forRoot({ name: 'default' }),
  //   NbLayoutModule,
  //   NbCardModule,
  //   NbSpinnerModule,
    ],
    exports: [ModalDemoComponent]
})
export class BaseNebularModule { }
