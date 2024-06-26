import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { GatewayHelper } from '../../utils/classes/websocket.classes';
import { EventType } from '@parcel/watcher';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({ cors: {} })
export class FileWatcherGateway extends GatewayHelper {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {
    super('watch');
  }

  addEvent(eventType: EventType, data: any) {
    this.redisService.saveEvent(eventType, data);
    this.server.emit(this.buildEventName(eventType), data);
  }
}
