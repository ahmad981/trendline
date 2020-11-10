console.log('Node env', process.env.NODE_ENV);
import { Sequelize } from 'sequelize';

export const database = new Sequelize({
  database: process.env.NODE_ENV === 'testing' ? 'trend_test' : 'trendline',
  dialect: 'mysql',
  username: 'sammy',
  password: '@Abc1234',
});

export const jwtSecret = 'somejwtprivatesecret123445566...';
export const HashSecret = 'some.@$%-943$#../a//--94/ds/fas-49jwtprivatesecret123445566...';
export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://prod-base-url.com';
export const SMTP = {
  "testing": {
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'dev.shahkhalid@gmail.com',
      pass: 'dev.khalid112233'
    }
  }
}
