// canvas.gateway.ts
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CanvasGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('draw')
    handleDraw(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('draw', data);
    }

    @SubscribeMessage('signal')
    handleSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('signal', data);
    }

    @SubscribeMessage('subtitle')
    handleSubtitle(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('subtitle', data);
    }
}
