/**
 * 1. test creation without admin (failed scenario)
 * 2. test creation with admin (success scenario)
 * 3. test creation without name field (failed scenario)
 * 4. test creation with name (success scenario) *
 */

const org_pass = {
    name: 'virtual university of pakistan',
    domain: '@vu.edu.pk',
};

const org_fail2 = {
    name: 'punjab university of pakistan'
};

const org_fail1 = {
    domain: '@pu.edu.pk'
};

let orgID;

process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { Industry } from '../apis/models';

const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";
const industry = { id: 1, name: 'Fashion' };
const industry1 = { id: 2, name: 'IT' };
const industry2 = { id: 3, name: 'Software' };
const industry3 = { id: 4, name: 'Electrical' };
const industry4 = { id: 5, name: 'Web' };
const industry5 = { id: 6, name: 'AI' };



chai.use(chaiHttp);


/*
 * Test the /GET route
 */
describe('INDUSTRY', () => {

    var ind: any = {};
    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL organizations
         */
        Industry.destroy({ where: {} })
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('it should failed create new industry [WITHOUT ADMIN LOGEDIN]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .send(industry)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should create industry - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should create industry 1 - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry1)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should create industry 2 - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry2)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should create industry 3 - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry3)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should create industry 4 - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry4)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should create industry5 - [CREATE INDUSTRY]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .set({ 'x-auth-token': admin_token })
            .send(industry5)
            .end((err, res) => {
                ind = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });


    it('it should get industry [GET INDUSTRY]', (done) => {
        chai
            .request(server)
            .get('/industry')
            .end((err, res) => {
                ind = res.body.data[0];
                expect(res).have.property('status').equal(200);
                done();
            });
    });


    it('it should update industry', (done) => {

        chai
            .request(server)
            .put('/industry/' + ind.id)
            .set({ 'x-auth-token': admin_token })
            .send({ name: ind.name + ' updated' })
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });


    it('it should not delete industry (DELETE INDUSTRY without admin)', (done) => {

        chai
            .request(server)
            .delete('/industry/' + ind.id)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should delete industry (DELETE INDUSTRY)', (done) => {
        chai
            .request(server)
            .delete('/industry/' + ind.id)
            .set({ 'x-auth-token': admin_token })
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should not remove industry [DELETE INDUSTRY WITH WRONG ID]', (done) => {
        chai
            .request(server)
            .delete('/industry/35')
            .set({ 'x-auth-token': admin_token })
            .end((err, res) => {
                expect(res).have.property('status').equal(400);
                done();
            });
    });



});
