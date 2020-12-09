const user_invalid_email = {
    email: 'skhalid0322',
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 1,
};

const user_invalid_no_email = {
    password: '123123123',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 1,
};

const user_no_pswd = {
    email: 'skhalid0322@gmail.com',
    name: 'shah khaliid',
    organizationId: 1,
    roleId: 1,
};

const user_no_name = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    organizationId: 1,
    roleId: 1,
};

const user_no_org = {
    email: 'skhalid0322@gmail.com',
    password: '123123123',
    name: 'shah khaliid',
    roleId: 1,
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
    roleId: 1,
};

const user_as_emp = {
    email: 'empl@gmail.com',
    password: '123123',
    name: 'some employer'
}

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

const update_company = {
    logo: 'http://logo.com/some/logo/updated',
    title: 'google company updated',
    description: 'some dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome dummy textsome  dummy textsome dummy text',
    industryId: 3,
}

const update_address = {
    line1: 'asomdfasdf updated',
    line2: 'asdfasdf updated',
    lat: '33.00499',
    lng: '59.3444',
    city: 'lahore updated',
    state: 'ny',
    zipcode: '33394'
}

const user_profile_update = {
    phone: '+1-123-123-123-1234',
    age: '23',
    education: 'Graduation updated',
    empStatus: 'un employed updated',
    gender: '1',
    anIncome: '12000',
    address: 'some address 123 123',
    gradComDate: '10-23-2022',
    linkedIn: 'http://linkedin.com/shahkhalid'
}


const user_profile = {
    phone: '+1-123-123-123-1234',
    age: '23',
    education: 'Graduation',
    empStatus: 'un employed',
    gender: '1',
    anIncome: '12000',
    address: 'some address 123 123',
    gradComDate: '10-23-2022',
    linkedIn: 'http://linkedin.com/shahkhalid'
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
import { Address, Company, Job, User, UserProfile } from '../apis/models';

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('USER', () => {
    var emp_token;
    var user_token;
    var user_gallery;

    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL organizations
         */

        // let emp_token;

        User.destroy({ where: {} })
            .then(async (res) => {
                await Job.destroy({where: {}})
                await Address.destroy({ where: {} })
                await Company.destroy({ where: {} })
                await UserProfile.destroy({ where: {} });
                
                done();
            })
            .catch(done);
    });

    describe('APPLICANT', () => {
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
                .send({ email: user.email, password: user.password })
                .end((err, res) => {
                    user_token = res.body.token;
                    console.log('TOKEN SET UP : ', user_token);
                    expect(res).have.property('status').equal(200);
                    expect(res.body).have.property('token');
                    done();
                });
        });

        it('it should not create with out login [CREATE APPLICANT PROFILE ]', (done) => {
            chai
                .request(server)
                .post('/company')
                // .set({ 'x-auth-token': emp_token })
                .send(company_ok)
                .end((err, res) => {
                    expect(res).have.property('status').equal(401);
                    // expect(res).have.property('token');
                    done();
                });

        });

        it('it should create [CREATE APPLICANT PROFILE ]', (done) => {
            chai
                .request(server)
                .post('/userprofile')
                .set({ 'x-auth-token': user_token })
                .send(user_profile)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    // expect(res).have.property('token');
                    done();
                });

        });

        it('it should update [UPDATE APPLICANT PROFILE]', (done) => {
            chai
                .request(server)
                .put('/userprofile/update')
                .set({ 'x-auth-token': user_token })
                .send(user_profile_update)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    // expect(res).have.property('token');
                    done();
                });

        });

    })

    describe('EMPLOYER', () => {

        it('it should sign up as employer ', (done) => {
            chai
                .request(server)
                .post('/user/emp/signup')
                .send(user_as_emp)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    expect(res.body).have.property('token');
                    done();
                });
        });

        it('it should log in as employer ', (done) => {

            chai
                .request(server)
                .post('/user/login')
                .send({ email: user_as_emp.email, password: user_as_emp.password })
                .end((err, res) => {
                    emp_token = res.body.token;
                    expect(res).have.property('status').equal(200);
                    expect(res.body).have.property('token');
                    // expect(res).have.property('token');
                    done();
                });
        });

        it('it should not create profile with out token ', (done) => {
            chai
                .request(server)
                .post('/company')
                .send({ email: user_as_emp.email, password: user_as_emp.password })
                .end((err, res) => {

                    expect(res).have.property('status').equal(401);
                    done();
                });
        });

        it('it should successfully create profile ', (done) => {
            chai
                .request(server)
                .post('/company')
                .set({ 'x-auth-token': emp_token })
                .send(company_ok)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    // expect(res).have.property('token');
                    done();
                });
        });

        it('it should successfully update [UPDATE COMPANY PROFILE] ', (done) => {
            chai
                .request(server)
                .put('/company/action/update')
                .set({ 'x-auth-token': emp_token })
                .send(update_company)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    // expect(res).have.property('token');
                    done();
                });
        });

        it('it should update company address [UPDATE COMPANY PROFILE ADDRESS] ', (done) => {
            chai
                .request(server)
                .put('/company/update/address')
                .set({ 'x-auth-token': emp_token })
                .send(update_address)
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    // expect(res).have.property('token');
                    done();
                });
        });


        it('it should upload gallery image to company [UPLOAD GALLERY IMAGE ]', (done) => {
            chai
                .request(server)
                .post('/company/add/photo')
                .set({ 'x-auth-token': emp_token })
                .send({ image: 'someimage url' })
                .end((err, res) => {
                    user_gallery = res.body.data;
                    expect(res).have.property('status').equal(200);
                    done();
                });

        });


        it('it should delete gallery image [REMOVE GALLERY IMAGE ]', (done) => {
            chai
                .request(server)
                .delete('/company/remove/photo/' + user_gallery.id)
                .set({ 'x-auth-token': emp_token })
                .send({ image: 'someimage url' })
                .end((err, res) => {
                    expect(res).have.property('status').equal(200);
                    done();
                });

        });



    })


});
