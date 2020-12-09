"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const devlogger = require("devlogger");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./apis/routes");
// const doc = require('./swagger.json');
// import * as doc from './swagger.json';
// const options = {
//   openapi: '3.0.0', 
//   info : {
//     title: 'Trendline docs',
//     version: '1.0.0',
//   },
//   api: ['./apis/routes'],
// };
// const swaggerSpecs = jsdoc(options);
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(devlogger('dev'));
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.Router());
        // this.app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(doc));
        this.app.use('/', middlewares_1.apiLimiter);
        this.app.use('/', routes_1.default);
        this.app.use(middlewares_1.convertError);
        this.app.use(middlewares_1.handler);
        this.app.use(middlewares_1.notFoundHandler);
    }
}
exports.default = new App().app;
