import { resolve } from 'path';

export enum EnvType {
  development = 'development',
  qa = 'qa',
  production = 'production',
}

/* ------------------------------- APPLICATION ------------------------------ */

export const DEFAULT_ENV = EnvType.development;
export const CONFIG_PATH_GLOB = resolve(__dirname, '../configs/**/!(*.d).{ts,js}');

export const DEFAULT_HOST_PROTOCOL = 'http';
export const DEFAULT_HTTP_HOST = '0.0.0.0';
export const DEFAULT_HTTP_PORT = 50001;
export const DEFAULT_SWAGGER_URL = '/doc';

/* -------------------------- DATABASE CONNECTIONS -------------------------- */