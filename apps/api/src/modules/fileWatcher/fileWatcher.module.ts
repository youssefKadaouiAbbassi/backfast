import { Module } from '@nestjs/common';
import { FileWatcherService } from './fileWatcher.service';

@Module({
  providers: [FileWatcherService],
})
export class FileWatcherModule {}
