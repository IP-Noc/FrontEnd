import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor( private socket: Socket ) {}

  public sendNocRoom(message: any): void {
    this.socket.emit('send_noc_room', message);
  }

}
