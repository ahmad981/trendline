/**
 * 1. create failed skill ( with out variations )
 * 2. add skill to job
 * 3. add quiz to job
 * 4. add start dates to job
 * 5. get job by employer id
 * 6. get all jobs
 *
 */

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
import { Skill, User } from '../apis/models';



chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('SKILLs', () => {

    var ind: any = {};
    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL users && jobs
         */
        Skill.destroy({ where: {} })
            .then((res) => {
                done();
            })
            .catch(done);
    });

    it('it should failed create Skill [WITHOUT LOGEDIN]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .send()
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should failed create Skill [WITHOUT ADMIN]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .send()
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should create Skill [SKILL CREATE SUCCESS]', (done) => {
        chai
            .request(server)
            .post('/industry')
            .send()
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });


    it('it should get skill successfully [GET SKILL SUCCESS]', (done) => {
        
    });

    it('it should get skills successfully [WITHOUT LOGEDIN]', (done) => {
        
    });

    it('it should Not UPDATE skill [FAILED UPDATE SKILL WITHOUT LOGEDIN]', (done) => {
        
    });

    it('it should update skill [SUCCESS UPDATE SKILL]', (done) => {
        
    });

    it('it should not delete skill [FAILED DELETE SKILL WITHOUT LOGEDIN]', (done) => {
        
    });


    it('it should delete skill [SUCCESS DELETE SKILL ADMIN]', (done) => {
        
    });

});
