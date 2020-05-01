import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ConfigService } from 'nestjs-config';
import { Connection } from 'mongoose';

import { EnvType } from '@common/constants';

@Injectable()
export class MigrationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  public async onApplicationBootstrap(): Promise<void> {
    const { ENV } = this.configService.get('app');

    if (ENV !== EnvType.development) {
      this.logger.debug(`Bypass migration on ${ENV} environment`);
      return;
    }

    this.logger.debug('Migrating database...');

    // only run migration on development mode
    if (ENV === 'development') await this.connection.dropDatabase();

    this.logger.debug('Migration done ✨');
  }
}
