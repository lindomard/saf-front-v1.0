import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class MessageService {

  private subject: WebSocketSubject<any>;
  private stompClient: any;

  constructor() {
    
  }

  public connect(pToken: String, pUrl: any) {

    //pUrl = 'ws://localhost:4151/socketImportarDados';
        
    let complementoEndPoint = "?access_token="+pToken;
    
    const ws = new SockJS(pUrl+complementoEndPoint );
    this.stompClient = Stomp.over(ws);

    
    
    this.subject = webSocket({
      
      url: ws,
      openObserver: {
        next: () => {
        }
      },
      closeObserver: {
        next: () => {
        }
      }

    });

    this.subject.subscribe(
      msg => console.log('message received: ' + msg),
      err => console.log(err),
      () => console.log('complete')
    );
  }

  public send(msg: string) {
    this.subject.next(msg);
  }

  public disconnect() {
    this.subject.complete();
  }
}