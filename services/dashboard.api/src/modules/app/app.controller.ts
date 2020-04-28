import { Controller, Get, ForbiddenException } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';

import { EnvType } from '@common/constants';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  @ApiOperation({
    description: 'Get information of our application, development only',
  })
  @ApiOkResponse({ type: Object, description: "Application's information" })
  @ApiForbiddenResponse({ description: 'Forbid exposing system information in production' })
  public getSysInfo(): object {
    const app = this.config.get('app');
    // const connections = this.config.get('connections');

    if (app.ENV === EnvType.production) throw new ForbiddenException();

    return {
      app,
      // connections,
    };
  }
}
