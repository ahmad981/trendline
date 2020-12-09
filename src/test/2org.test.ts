const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";

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
import { Organization } from '../apis/models';

chai.use(chaiHttp);


/*
 * Test the /GET route
 */
describe('ORGANIZATION', () => {
    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL organizations
         */
        Organization.destroy({ where: {} })
            .then((res) => {
                done();
            })
            .catch(done);
    });


    it('it should not create new organization with out admin [CREATE FAILED WITHOUT ADMIN]', (done) => {
        chai
            .request(server)
            .post('/org')
            .send(org_pass)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should create new organization', (done) => {
        chai
            .request(server)
            .post('/org')
            .set({ 'x-auth-token': admin_token })
            .send(org_pass)
            .end((err, res) => {
                orgID = res.body.data.id;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('id');
                expect(res.body.data).have.property('domain').equal(org_pass.domain);
                expect(res.body.data).have.property('name').equal(org_pass.name);
                expect(res.body.data).have.property('createdAt');
                expect(res.body.data).have.property('updatedAt');
                done();
            });
    });

    it('it should not create new organization - [missing domain]', (done) => {
        chai
            .request(server)
            .post('/org')
            .set({ 'x-auth-token': admin_token })
            .send(org_fail2)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                done();
            });
    });

    it('it should not create new organization - [missing name]', (done) => {
        chai
            .request(server)
            .post('/org')
            .set({ 'x-auth-token': admin_token })
            .send(org_fail1)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                done();
            });
    });

    it('it should not create duplicated organization', (done) => {
        chai
            .request(server)
            .post('/org')
            .set({ 'x-auth-token': admin_token })
            .send(org_pass)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                done();
            });
    });

    it('it should not delete organization', (done) => {
        chai
            .request(server)
            .delete('/org/' + orgID)
            .set({ 'x-auth-token': admin_token })
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should get organizations', (done) => {
        chai
            .request(server)
            .get('/org')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });
});
