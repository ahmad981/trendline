import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as devlogger from 'devlogger';
// import * as jsdoc from 'swagger-jsdoc';
// import * as swaggerUI from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import * as cron from 'node-cron';

import { handler, notFoundHandler, convertError, apiLimiter } from './middlewares';
import routes from './apis/routes';

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
 
// const doc = require('./testing.json');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(devlogger('combined', {stream: accessLogStream}));
    this.app.use(express.static('public'));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.Router());

    cron.schedule('*/12 * * * *', () => {
      console.log('-- every one minute scheduled job --- ', new Date());
    });
    // this.app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(doc));
    this.app.use('/', apiLimiter);
    this.app.use('/', routes);
    this.app.use(convertError);
    this.app.use(handler);
    this.app.use(notFoundHandler);
  }
}

export default new App().app;
