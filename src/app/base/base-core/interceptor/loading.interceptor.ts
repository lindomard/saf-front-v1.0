import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor{
    private httpRequests: Array<HttpRequest<any>> = [];

    constructor(
        private loadindService: LoadingService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.httpRequests.push(req);
        this.loadindService.loadingNotify(true);
        return Observable.create( observer => {
            const subscription = next.handle(req)
            .subscribe(
                event => {
                    if (event instanceof HttpResponse) {
                        this.removerRequest(req);
                        observer.next(event);
                    }
                },
                err => {
                    this.removerRequest(req);
                    observer.error(err);
                },
                () => {
                    this.removerRequest(req);
                    observer.complete();
                });
            return () => {
                this.removerRequest(req);
                subscription.unsubscribe();
            }
        });
    }

    /**
     * notify service laoding
     * @param request 
     */
    private removerRequest(request: HttpRequest<any>) {
        const i = this.httpRequests.indexOf(request);
        if (i >= 0) {
            this.httpRequests.splice(i, 1);
        }
        this.loadindService.loadingNotify(this.httpRequests.length > 0);
    }
}