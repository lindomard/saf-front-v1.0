import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  processData(): Observable<string> {
    return of('Processamento concluído!').pipe(delay(3000)); // Simula um atraso de 3 segundos
    
  }
}
