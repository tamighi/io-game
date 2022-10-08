import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
    cors: '*'
  })
  export class GameGateway {

    constructor(private readonly gameService: GameService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('joinGame')
    joinGame(@ConnectedSocket() client: Socket, @MessageBody() userName: string) {
        this.gameService.addToGame(client, userName);
    }

    @SubscribeMessage('updateDirection')
    updateDir(@ConnectedSocket() client: Socket, @MessageBody() dir: number) {
        this.gameService.updateDirection(client.id, dir);
    }
  }