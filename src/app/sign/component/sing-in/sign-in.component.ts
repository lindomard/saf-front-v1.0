import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig, FormBuildComponent } from 'src/app/base/base-shared/form-build/form-build.component';
import { SuccessState, ErroState } from '../../domain/state/state-sign';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { MatDialog } from '@angular/material/dialog';
import { ShowLoading, HideLoading } from '@base-core/state/state';
import { SignForm } from '@sign/form/sign-form';
import { SignController } from './sign-controller';
import { Subscription } from 'rxjs';
import { SessionService } from '@base-core/session/session.service';
import { SignControllerSL } from './sign-controllerSL';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends ProgressBarShowComponent implements OnInit, OnDestroy {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  private $subjectController: Subscription;
  private $subjectControllerSL: Subscription;

  fields: FormBuildConfig[] = [];
  form: UntypedFormGroup;

  constructor(
    private signForm: SignForm,
    private signController: SignController,
    private signControllerSL: SignControllerSL,
    private snotify: SnotifyService,
    private router: Router,
    public dialog: MatDialog,
    private session: SessionService
  ) {
    super(dialog)
  }

  ngOnInit() {
    this.session.removeToken();
    this.initialazer();
    this.initialazerController();
    this.form.get('company').setValue('52');
    this.form.get('username').setValue('lindomar');
    this.form.get('password').setValue('123');
  }

  private initialazerController() {

    this.$subjectController = this.signController.observable.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
          this.showLoading();
          break;
        }
        case HideLoading: {
          this.hideLoading();
          break;
        }
        case SuccessState: {
          this.router.navigate(['/page/home']);
          break;
        }
        case ErroState: {
          this.form.get('password').reset();
          this.snotify.error((state as ErroState).param);
          break;
        }
      }
    });

    // segundo sem logar
    this.$subjectControllerSL = this.signControllerSL.observable.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
          this.showLoading();
          break;
        }
        case HideLoading: {
          this.hideLoading();
          break;
        }
        case SuccessState: {
          this.router.navigate(['/page/cadpessoas'], { queryParams: { idPessoa: 0}});
          break;
        }
        case ErroState: {
          this.form.get('password').reset();
          this.snotify.error((state as ErroState).param);
          break;
        }
      }
    });
    // segundo sem logar

  }

  private initialazer() {
    this.form = this.signForm.form;
    this.fields = this.signForm.fields;

  }



  naoTenhoCadastro() {
    this.form.get('company').setValue('0');
    this.form.get('username').setValue('Sem Logar');
    this.form.get('password').setValue('123');

    this.signInSL();





  }
  signIn() {
    this.signController.signIn(this.form);
  }

  signInSL() {
    this.signControllerSL.signIn(this.form);
  }



  ngOnDestroy() {
    this.hideLoading();
    this.$subjectController.unsubscribe();
  }

}
