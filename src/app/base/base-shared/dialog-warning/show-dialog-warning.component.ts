import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogWarningComponent } from './dialog-warning.component';

@Injectable()
export class ShowDialogWarningComponent {

    public dialogRef: MatDialogRef<DialogWarningComponent>;

    constructor(public dialog: MatDialog) {}

    public show(title: string, message: string) {
        this.dialog.open(DialogWarningComponent, {
            width: '400px',
            data: { title: title, message: message}
        });
    }
}