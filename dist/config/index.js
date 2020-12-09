"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP = exports.baseUrl = exports.HashSecret = exports.jwtSecret = exports.database = void 0;
const sequelize_1 = require("sequelize");
console.log('Node env', process.env.NODE_ENV, process.env.NODE_ENV === 'testing');
exports.database = new sequelize_1.Sequelize({
    database: process.env.NODE_ENV === 'testing' ? 'trend_test' : 'trendline',
    dialect: 'mysql',
    username: 'sammy',
    password: '@Abc1234',
    logging: false,
});
exports.jwtSecret = 'somejwtprivatesecret123445566...';
exports.HashSecret = 'some.@$%-943$#../a//--94/ds/fas-49jwtprivatesecret123445566...';
exports.baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://prod-base-url.com';
exports.SMTP = {
    'testing': {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'dev.shahkhalid@gmail.com',
            pass: 'dev.khalid112233',
        },
    },
};
