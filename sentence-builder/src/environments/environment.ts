import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5519',
  logging: {
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'http://localhost:5519/'
  }
};