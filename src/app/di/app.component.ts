import { AfterContentInit, Component } from '@angular/core';
import { LoadingService } from '../base/base-core/service/loading.service';

(window as any)['global'] = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  isProgress: boolean = false;

  constructor(
    private loadingService: LoadingService
  ) {}

  ngAfterContentInit() {
    this.loadingService.$loading.subscribe(is => {
      this.isProgress = is;
    });
  }
}
