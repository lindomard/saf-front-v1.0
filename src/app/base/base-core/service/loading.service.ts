import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/di/app.module';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private $loadingSubject: BehaviorSubject<boolean>;
  public $loading: Observable<boolean>;

  constructor() { 
        this.$loadingSubject = new BehaviorSubject<boolean>(false);
        this.$loading = this.$loadingSubject.asObservable();
  }

  loadingNotify(isLoadign: boolean) {
        this.$loadingSubject.next(isLoadign);
    }
}
