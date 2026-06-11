import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


export class WebSocketConnector {

    private stompClient: any;

    constructor(
      private accessToken: string, 
      private webSocketEndPoint: string, 
      private topic: string, 
      private onMessage: Function, 
      private callbackError?: Function) {
        const errorCallback = callbackError || this.onError;
        this.connect(errorCallback);
        


    }

    private connect(errorCallback: Function) {
      let complementoEndPoint = "?access_token="+this.accessToken;
      const ws = new SockJS(this.webSocketEndPoint+complementoEndPoint, this.accessToken );
//        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ2YWxiZXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwib3JnYW5pemF0aW9uIjoiR2VuZXNpcy1jb3JlIiwiZXhwIjoxNjQwNzE5MjQ3LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMWM0MzFlMDMtOWZhZC00ZTViLWE1ZTYtMmM4MmYxZGMwOTRiIiwiREJfQ09ORklHIjp7InVzZXJuYW1lTG9nZ2VkIjoidmFsYmVyIiwiY29tcGFueUlkIjoyLCJ1c2VySWQiOm51bGwsInJlZ2lzdGVyRGJOYW1lIjoiZ3dfMDAyY2FkYXN0cm8iLCJyZWdpc3RlckRiVXJsIjpudWxsLCJyZWdpc3RlckRiVXNlcm5hbWUiOm51bGwsInJlZ2lzdGVyRGJQYXNzd29yZCI6bnVsbCwiY29tcGFueU5hbWUiOiJFbXByZXNhIFRlc3RlIEx0ZGEiLCJjb25maWdOYW1lRGIiOm51bGx9LCJjbGllbnRfaWQiOiJnZW5lc2lzX3BqX2dlaCJ9.Nf7HKgEEjkZV8scGsBLlQ5sJFqb39b2a6w46Bks6iD0";
      this.stompClient = Stomp.over(ws);
//      this.stompClient.Authorization = this.accessToken;
      this.stompClient.connect( {} , frame => {
          this.stompClient.subscribe(this.topic, event => {
              this.onMessage(event);
          });
      }, errorCallback.bind(this));
  };



    public stop() {
      if (this.stompClient !==null) {
      this.stompClient.disconnect();
      }
    }
    private readonly httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      // ,'Authorization': environment.basic,
    });

    private httpOptionsAuthorization(accessToken: string) {
      return new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      });
    }

    private onError(error :any ) {
//        console.log("Error while connect: " + error);
        setTimeout(() => {
//            console.log("Trying to connect again...");
            this.connect(this.onError);
            this.stop();
        }, 3000);
    }
}