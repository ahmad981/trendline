const user_invalid_email = {
    email: 'skhalid0322',
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 4,
};
const user_invalid_no_email = {
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 4,
};

const user_no_pswd = {
    email: 'skhalid0322@gmail.com',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 4,
};

const user_no_name = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    organizationId: 1,
    roleId: 4,
};


const user_no_org = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    name: 'shah khaliid',
    roleId: 4,
};

const user_no_role = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
};

const user = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 4,
};


process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { User } from '../apis/models';

chai.use(chaiHttp);


/*
 * Test the /GET route
 */
describe('USER', () => {
    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL organizations
         */
        User.destroy({ where: {} })
            .then((res) => {
                console.log('truncated table ...', res);
                done();
            })
            .catch(done);
    });

    it('it should not sign up with invalid email (email validation)', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user_invalid_email)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`\"email\" must be a valid email`);
                done();
            });
    });

    it('it should not sign up without email', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user_invalid_no_email)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`\"email\" is required`);
                done();
            });
    });

    it('it should not signup without name', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user_no_name)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`\"name\" is required`);
                done();
            });
    });

    it('it should not signup without organization ID', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user_no_org)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`\"organizationId\" is required`);
                done();
            });
    });



    it('it should not signup without role ID', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user_no_role)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`\"roleId\" is required`);
                done();
            });
    });




    it('it should signup successfully', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body).have.property('token');
                done();
            });
    });





    it('it should not sign up with duplicate email', (done) => {
        chai
            .request(server)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                expect(res).have.property('status').not.equal(200);
                done();
            });
    });




    it('it should log in successfully ', (done) => {
        chai
            .request(server)
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body).have.property('token');
                // expect(res).have.property('token');
                done();
            });
    });



});
