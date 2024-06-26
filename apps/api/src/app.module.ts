import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileWatcherModule } from './modules/fileWatcher/fileWatcher.module';
import {
  DATABASE_NAME,
  DATABASE_URI,
} from './utils/constants/database.constants';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>(
          DATABASE_URI,
        )}/${configService.get<string>(DATABASE_NAME)}`,
      }),
      inject: [ConfigService],
    }),
    RedisModule,
    FileWatcherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
