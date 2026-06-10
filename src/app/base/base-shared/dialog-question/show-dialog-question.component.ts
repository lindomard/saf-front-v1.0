import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogQuestionComponent, DataDialogQuestion } from './dialog-question.component';

@Injectable()
export class ShowDialogQuestion {

    public dialogRef: MatDialogRef<DialogQuestionComponent>;

    public handlerYes: { (): void };
    public handlerNo: { (): void };

    constructor(public dialog: MatDialog) { }

    public showDialog(
        width: string,
        data: DataDialogQuestion
    ) {
        this.dialogRef = this.dialog.open(DialogQuestionComponent, {
            width: width,
            data: data
        });
        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.handlerYes();
            } else {
                this.handlerNo();
            }
        });
    }

}