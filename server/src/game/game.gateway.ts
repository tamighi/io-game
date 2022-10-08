import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    OnGatewayConnection,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: '*'
  })
  export class GameGateway implements OnGatewayConnection {

    @WebSocketServer()
    server: Server;

    handleConnection(client: any, ...args: any[]) {
        console.log('Connected !');
    }

    @SubscribeMessage('play')
    play() {
        console.log('play !')
    }
  }