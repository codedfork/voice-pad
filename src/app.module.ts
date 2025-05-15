import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CanvasGateway } from './modules/websocket/canvas.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CanvasGateway],
})
export class AppModule {}
