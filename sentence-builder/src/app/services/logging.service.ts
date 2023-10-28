import { Injectable } from '@angular/core';

import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private logger: NGXLogger) { }

  public frontendLogging = (level:any, msg:any) => {
    switch (level) {
      case 0:
        this.logger.debug(msg);
        break;
      case 1:
        this.logger.info(msg);
        break;
      case 2:
        this.logger.log(msg);
        break;
      case 3:
        this.logger.warn(msg);
        break;
      case 4:
        this.logger.error(msg);
        break;
    }
  }
}
