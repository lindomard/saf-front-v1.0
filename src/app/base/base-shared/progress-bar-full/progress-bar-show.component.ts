import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { safeCall } from '@base-core/safe-call';
import { ProgressBarFullComponent } from './progress-bar-full.component';

@Component({
    selector: 'app-component-show',
    template: ``
})
export class ProgressBarShowComponent {

    private loadingRef: MatDialogRef<ProgressBarFullComponent>;

    constructor(protected dialog: MatDialog) { }
    

    public showLoading() {
        this.loadingRef = this.dialog.open(ProgressBarFullComponent);
    }

    public hideLoading() {
        safeCall(this.loadingRef, (it) => {
            it.close();
        });
    }
}