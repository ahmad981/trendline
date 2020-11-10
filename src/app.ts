import * as express from 'express';
import * as bodyParser from 'body-parser';
import { handler, notFoundHandler, convertError } from './middlewares';
import routes from './apis/routes';

// app.listen(3000, () => console.log('server listening on port 3000 ...'));

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.Router());
    this.app.use('/', routes);
    this.app.use(convertError);
    this.app.use(handler);
    this.app.use(notFoundHandler);
  }
}

export default new App().app;
