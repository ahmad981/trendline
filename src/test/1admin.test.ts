/**
 * 1. login as admin
 * 2. create admin_user (with all scenarios)
 *    2.1 different roled id
 *    2.2 with out pswrd
 *    2.3 with out email
 *    2.4 with out name
 */



const admin = { email: 'shahkhalidsuperadmin@gmail.com', password: '123456' };
const company_ok = {
    logo: 'http://logo.com/some/logo',
    title: 'google company',
    description: 'some dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome  dummy textsome dummy text',
    line1: 'asomdfasdf',
    line2: 'asdfasdf',
    industryId: '3',
    lat: '33.00499',
    lng: '59.3444',
    city: 'lahore',
    state: 'ny',
    zipcode: '33394'
}
const new_user = {
    email: 'someAdmin@trendline.com',
    password: '123456',
    roleId: 3,
    name: 'Admin new'
}

// let emp_token;

/**
 * 1. company profile should not set up if role is not employer (FC)
 * 2. company profile should be set up if role is employer i.e roleId : 2 (SC)
 * 3. testing following scenarios: .no city, not state, no industry, no lat/lng, invalid lat/lng
 */
process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { initModels, User } from '../apis/models';
import { seedSuperAdmin } from '../utils/seed';

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('Admin', () => {
    var admin_token;
    before(async () => {
        try {
            await initModels();
            await User.destroy({ where: { roleId: 3 } });
            await seedSuperAdmin();
            await setTimeout(() => {
            console.log('... stopped ....')
        }, 2000);
        } catch (error) {
            console.log('------- error ------');
            console.log(error);
            console.log('------- error ------');
        }
        
                
        
    })
    // before((done) => {
    //     //Before each test we empty the organization table
    //     /**
    //      * REMOVE ALL organizations
    //      */

    //     User.destroy({ where: { roleId: 3 } }).then(async () => {
    //         try {
    //             await seedSuperAdmin();
    //             done()
    //         } catch (error) {
    //             done()
    //         }

    //     })
    //         .catch(done);

    // });

    it('it should login successfully', (done) => {
        chai
            .request(server)
            .post('/user/login')
            .send({ email: admin.email, password: admin.password })
            .end((err, res) => {
                admin_token = res.body.token;
                expect(res).have.property('status').equal(200);
                expect(res.body).have.property('token');
                done();
            });
    });

    it('it should create admin (CREATE NEW ADMIN)', (done) => {
        chai
            .request(server)
            .post('/user/create/admin')
            .set({ 'x-auth-token': admin_token })

            .send(new_user)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

});
