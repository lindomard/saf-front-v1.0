import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';

export interface FiltroGenerico {
  nomeCampo: string;
  valorCampo: string;
}

export interface ParametrosDados {
  filtrosGenericosList: FiltroGenerico[];
}




@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 private stompClient: Client | null = null;
  private messageSubject = new Subject<string>();
  private statusSubject = new Subject<string>();

  private currentStatus = 'DESCONECTADO';

  constructor(private http: ApiCreateHttpclienteService) {}

  public getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  public getStatus(): Observable<string> {
    return this.statusSubject.asObservable();
  }

  public connect(url: string, token?: string): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }

    if (this.stompClient) {
      this.stompClient.deactivate();
    }

    this.setStatus('CONECTANDO');

    const cleanToken = token?.trim();
    const fullUrl = cleanToken ? `${url}?access_token=${cleanToken}` : url;
    console.log('Conectando ao WebSocket:', fullUrl);

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(fullUrl),
      reconnectDelay: 0,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.setStatus('CONECTADO');

      this.stompClient?.subscribe('/statusProcessorImportarDados', (message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      this.setStatus('ERRO');
      this.messageSubject.next('Erro no STOMP: ' + frame.headers['message']);
    };

    this.stompClient.onWebSocketClose = () => {
      this.setStatus('DESCONECTADO');
    };

    this.stompClient.activate();
  }

  private setStatus(status: string): void {
    if (this.currentStatus !== status) {
      this.currentStatus = status;
      this.statusSubject.next(status);
    }
  }

  public disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      this.setStatus('DESCONECTADO');
    }
  }

  public startProcess(baseUrl: string, params: ParametrosDados, token?: string): Observable<any> {
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return this.http.put(`${cleanUrl}/appImportarDados`, params, { headers });
  }
}

