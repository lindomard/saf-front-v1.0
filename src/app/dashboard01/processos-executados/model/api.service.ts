import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Person } from './person';
import { data } from './data';
import { ApiAnswer } from './api-answer';
import { Config, configColumns } from './config';
import { ConfigProcessosExecutados, configColumnsProcessosExecutados } from './configProcessosExecutados';
import { ProcessosExecutadosModel } from './processo-executadosModel';

@Injectable()
export class ApiService {

  public getConfig(): Observable<Config> {
    return Observable.of(configColumns);
  }

  public getConfigProcessosExecutados(): Observable<ConfigProcessosExecutados> {
    return Observable.of(configColumnsProcessosExecutados);
  }



  public getData(limit: number, offset: number): Observable<ApiAnswer<Person>> {

    return Observable.of(data)
    .pipe(
      map((data: Person[]) => {
        const result: ApiAnswer<Person> = {
          limit: limit,
          offset: offset,
          total: data.length,
          result: data.slice(offset, (limit + offset))
        }

        return result;
      })
    );
  }

  public getPerson(index: number): Observable<Person> {
    return Observable.of((data[index] as Person));
  }



  public getDataProcessosExecutados(limit: number, offset: number, pData: ProcessosExecutadosModel[]): Observable<ApiAnswer<ProcessosExecutadosModel>> {

    return Observable.of(pData)
    .pipe(
      map((data: ProcessosExecutadosModel[]) => {
        const result: ApiAnswer<ProcessosExecutadosModel> = {
          limit: limit,
          offset: offset,
          total: data.length,
          result: data.slice(offset, (limit + offset))
        }

        return result;
      })
    );
  }

}