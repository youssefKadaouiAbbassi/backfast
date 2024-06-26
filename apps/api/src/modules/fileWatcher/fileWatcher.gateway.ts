import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { GatewayHelper } from '../../utils/classes/websocket.classes';
import { EventType } from '@parcel/watcher';

@WebSocketGateway({ cors: {} })
export class FileWatcherGateway extends GatewayHelper {
  @WebSocketServer()
  server: Server;

  constructor() {
    super('watch');
  }

  addEvent(eventType: EventType, data: any) {
    this.server.emit(this.buildEventName(eventType), data);
  }
}
