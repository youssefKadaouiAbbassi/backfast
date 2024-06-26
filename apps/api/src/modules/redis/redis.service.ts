import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'node:process';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(process.env.REDIS_URI, {
      reconnectOnError: (err) => {
        this.logger.error('Redis connection error', err);
        return true;
      },
    });

    this.redisClient.on('connect', () => {
      this.logger.log('Connected to Redis');
    });

    this.redisClient.on('error', (err) => {
      this.logger.error('Redis error', err);
    });

    this.redisClient.on('reconnecting', () => {
      this.logger.log('Reconnecting to Redis');
    });
  }

  saveEvent(event: string, data: any) {
    const eventKey = `events:${event}:${Date.now()}`;
    this.redisClient.set(eventKey, JSON.stringify(data));
  }

  // async getEvents(event: string): Promise<any[]> {
  //   const keys = await this.redisClient.keys(`events:${event}:*`);
  //   const events = await Promise.all(
  //     keys.map((key) => this.redisClient.get(key)),
  //   );
  //   return events.map((event) => JSON.parse(event));
  // }
  onModuleDestroy() {
    this.redisClient.quit();
  }
}
