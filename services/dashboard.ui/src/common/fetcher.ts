import url from 'url';
import fetch from 'isomorphic-unfetch';

const API_BASE = url.format({
  protocol: process.env.API_PROTOCOL,
  hostname: process.env.API_HOSTNAME,
  port: process.env.API_PORT,
});

export const fetcher = (pathname: string, init?: RequestInit): Promise<Response> => {
  return fetch(API_BASE + pathname, init).then((res) => res.json());
};
