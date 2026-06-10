import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-progress-bar-nebular',
  templateUrl: './progress-bar-nebular.component.html',
  styleUrls: ['./progress-bar-nebular.component.scss']
})
export class ProgressBarNebularComponent {
  loading: boolean = false;


  constructor(private loadingService: LoadingService) { }


  processData(): void {
    this.loading = true;
    this.loadingService.processData().subscribe(() => {
      this.loading = false;
    });
  }

  public showLoading() {
    this.loading = true;
  }

  public hideLoading() {
    this.loading = false;
  }

}
