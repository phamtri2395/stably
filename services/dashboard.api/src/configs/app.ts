import { DocumentBuilder } from '@nestjs/swagger';
import {
  DEFAULT_ENV,
  DEFAULT_HOST_PROTOCOL,
  DEFAULT_HTTP_HOST,
  DEFAULT_HTTP_PORT,
  DEFAULT_SWAGGER_URL,
} from '@common/constants';

import readPkgUp = require('read-pkg-up');

const { packageJson: pkg } = readPkgUp.sync();
const APP_NAME = pkg.name;
const APP_VERSION = pkg.version;

const SWAGGER_OPTIONS = new DocumentBuilder()
  .setTitle('APIs documentation')
  .setDescription('Root documentation of application APIs')
  .setVersion(APP_VERSION)
  .addBearerAuth()
  .build();

export default {
  ENV: process.env.NODE_ENV || DEFAULT_ENV,
  HTTP_HOST: process.env.HTTP_HOST || DEFAULT_HTTP_HOST,
  HTTP_PORT: process.env.HTTP_PORT || DEFAULT_HTTP_PORT,
  HOST_PROTOCOL: process.env.HOST_PROTOCOL || DEFAULT_HOST_PROTOCOL,
  HOST_NAME: process.env.HOST_NAME || DEFAULT_HTTP_HOST,
  HOST_PORT: process.env.HOST_PORT || DEFAULT_HTTP_PORT,
  APP_NAME,
  APP_VERSION,
  SWAGGER_URL: process.env.SWAGGER_URL || DEFAULT_SWAGGER_URL,
  SWAGGER_OPTIONS,
};
