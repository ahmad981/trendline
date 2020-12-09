process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { initModels, User } from '../apis/models';
import { seedSuperAdmin } from '../utils/seed';
chai.use(chaiHttp);

describe('Init', () => {
    var admin_token;
    before(async () => {
        await initModels();
    })
    it("should be ok", (done)=>{
        done();
    })
});