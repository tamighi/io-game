import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: '*'
  })
  export class GameGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('play')
    play() {
        console.log('play !')
    }

    @SubscribeMessage('updateDirection')
    updateDir(client: Socket, @MessageBody() dir: number) {
        console.log(dir);
    }
  }