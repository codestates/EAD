/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

// namespace -> room

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  // 연결이 끊길 때 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  // 연결이 되자마자 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.rooms);
    console.log(data);

    socket.join(data);
    socket.to(data).emit('welcome', data);
    return data;
  }

  @SubscribeMessage('bye')
  handleMakeRoom(@MessageBody() room, @ConnectedSocket() socket: Socket) {
    socket.to(room).emit('bye', room);
  }

  @SubscribeMessage('new_message')
  handleSubmitChat(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const [message, room, myUsername] = data;
    socket.to(room).emit('new_message', `${myUsername}: ${message}`);
    return message;
  }
}
