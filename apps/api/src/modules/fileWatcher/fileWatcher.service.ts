import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import watcher from '@parcel/watcher';
import { WATCHED_FOLDER } from './fileWatcher.constants';
import { FileWatcherGateway } from './fileWatcher.gateway';

@Injectable()
export class FileWatcherService implements OnModuleInit {
  private readonly logger = new Logger(FileWatcherService.name);
  private readonly watchedFolder: string;

  constructor(
    private configService: ConfigService,
    private readonly FileWatcherGateway: FileWatcherGateway,
  ) {
    this.watchedFolder = this.configService.get<string>(WATCHED_FOLDER);
    console.log(this.watchedFolder);
  }

  async onModuleInit() {
    if (this.watchedFolder) {
      await this.watchFiles();
    } else {
      this.logger.error('WATCHED_FOLDER is not defined in the environment');
    }
  }

  async watchFiles() {
    try {
      const subscription = await watcher.subscribe(
        this.watchedFolder,
        (err, events) => {
          if (err) {
            this.logger.error(`Error watching files: ${err.message}`);
            return;
          }

          events.forEach((event) => {
            switch (event.type) {
              case 'create':
                this.logger.log(`File ${event.path} has been added`);
                this.FileWatcherGateway.addEvent(
                  event.type,
                  `File ${event.path} has been added`,
                );
                break;
              case 'update':
                this.logger.log(`File ${event.path} has been changed`);
                this.FileWatcherGateway.addEvent(
                  event.type,
                  `File ${event.path} has been changed`,
                );
                break;
              case 'delete':
                this.logger.log(`File ${event.path} has been removed`);
                this.FileWatcherGateway.addEvent(
                  event.type,
                  `File ${event.path} has been removed`,
                );
                break;
            }
          });
        },
      );
      this.logger.log(`Started watching folder: ${this.watchedFolder}`);
    } catch (err) {
      this.logger.error(`Failed to watch folder: ${(err as any).message}`);
    }
  }
}
