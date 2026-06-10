import { Injectable } from '@angular/core';

import { HttpClient, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  // pathUplod = 'uploadFile';
  
  xqtd: number;

  constructor(private http: ApiCreateHttpclienteService, private loadingService: LoadingService
    ) { }


  uploadFiles(formData: FormData, pUrl: string): Observable<any> {
//    let mIdcliente = 0;

//    const url = `${environment.url}${this.pathUplod}`;
//    let  pUrl: string = "";  
//    const url = `${pUrl}`;
      //return this.api.postFile<any>(Url, object);

    return this.http.postFileProgress<any>(pUrl, formData).pipe(
      map(event => {
//        console.log(`EVENTt = ${event}`);
//        console.log(`EVENTt string file = ${JSON.stringify(event)}`);

//        console.log(`type event = ${event.type}`);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    )
  }


  
  /*

  return this.http.postFile<any>(pUrl, formData).pipe(
      map(event => {
        console.log(`type event = ${event.type}`);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    )
*/

 private showProgress(message) {
 }
 private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}; 

 private getEventMessage(event: HttpEvent<any>, file: File) {


this.xqtd++;


  switch (event.type) {
    case HttpEventType.Sent:
      return `Uploading file "${file.name}" of size ${file.size}.`;

    case HttpEventType.UploadProgress:
      // Compute and show the % done:
      const percentDone = Math.round(100 * event.loaded / event.total);
      return `File "${file.name}" is ${percentDone}% uploaded.`;

    case HttpEventType.Response:
      return `File "${file.name}" was completely uploaded!`;

    default:
      return `File "${file.name}" surprising upload event: ${event.type}.`;
  } 
}

  
}
