import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CanvasGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private connectedUsers: string[] = [];

    handleConnection(client: Socket) {
        this.connectedUsers.push(client.id);
        this.server.emit('participants', this.connectedUsers);
    }

    handleDisconnect(client: Socket) {
        this.connectedUsers = this.connectedUsers.filter(id => id !== client.id);
        this.server.emit('participants', this.connectedUsers);
    }

    @SubscribeMessage('draw')
    handleDraw(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('draw', data);
    }

    @SubscribeMessage('signal')
    handleSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('signal', { ...data, from: client.id });
    }

    @SubscribeMessage('subtitle')
    handleSubtitle(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.broadcast.emit('subtitle', data);
    }

    @SubscribeMessage('clear')
    handleClear(@ConnectedSocket() client: Socket) {
        client.broadcast.emit('clear');
    }

    @SubscribeMessage('ready')
    handleReady(@ConnectedSocket() client: Socket) {
        client.broadcast.emit('new-user', client.id);
    }
}
