// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

const APP_NAME = pkg.name;
const APP_VERSION = pkg.version;

const API_PROTOCOL = process.env.API_PROTOCOL || 'http';
const API_HOSTNAME = process.env.API_HOSTNAME || '127.0.0.1';
const API_PORT = process.env.API_PORT || 50001;

module.exports = {
  APP_NAME,
  APP_VERSION,
  API_PROTOCOL,
  API_HOSTNAME,
  API_PORT,
};
