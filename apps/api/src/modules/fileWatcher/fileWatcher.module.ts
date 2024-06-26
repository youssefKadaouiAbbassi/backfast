import { Module } from '@nestjs/common';
import { FileWatcherService } from './fileWatcher.service';
import { FileWatcherGateway } from './fileWatcher.gateway';

@Module({
  providers: [FileWatcherService, FileWatcherGateway],
})
export class FileWatcherModule {}
