/**
 * 1. test creation without admin (failed scenario)
 * 2. test creation with admin (success scenario)
 * 3. test creation without name field (failed scenario)
 * 4. test creation with name (success scenario) *
 */


process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { Industry } from '../apis/models';

const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";

chai.use(chaiHttp);


/*
 * Test the /GET route
 */
describe('MEDIA UPLOAD', () => {



    it('it should not upload any other format except (images i.e jpg, png, jpeg) [UPLOAD UNSUPPORTED FAILED]', (done) => {
        chai
            .request(server)
            .post('/media/upload')
            .attach("image", __dirname + '/testing.txt')
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                done();
            });
    });



    it('it should upload image [UPLOAD IMAGE]', (done) => {
        chai
            .request(server)
            .post('/media/upload')
            .attach("image", __dirname + '/lion.jpg')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });


});
