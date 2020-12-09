
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
import { Question, Option } from '../apis/models';
import { seedSuperAdmin } from '../utils/seed';

const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";
const question = {question: 'is this is paid internship', type: 1, category: 1, options: [{option: 'paid'}, {option: 'not paid'}]};
const questionFailed = {question: 'is this is paid internship', options:[{option: 'yes'}, {option: 'not paid'}]};
const questionupdate = {question: 'is it an paid internship (updated)'};
var option = {questionId: 1, option: 'some option to question'};
var optionupdate = {questionId: 1, option: 'some updated option'};
chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('QUESTION', () => {

    var q: any = {};
    var op: any = {};

    before((done) => {
        //Before each test we empty the organization table
        /**
         * REMOVE ALL users && jobs
         */
        Question.destroy({where: {} }).then(async () => {
            try {
                await seedSuperAdmin();
                await Option.destroy({where: {}});
                done();
            } catch (error) {
                done();
            }

        })
            .catch(done);
    });

    it('it should failed create questions [WITHOUT LOGEDIN]', (done) => {
        chai
            .request(server)
            .post('/quiz')
            .send(question)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should create question [QUESTION CREATE SUCCESS]', (done) => {
        chai
            .request(server)
            .post('/quiz')
            .set({'x-auth-token': admin_token})
            .send(question)
            .end((err, res) => {
                q = res.body.data;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('question').equal(question.question);
                done();
            });
    });

    

    it('it should get questions successfully [GET QUESTIONS SUCCESS]', (done) => {
        chai
            .request(server)
            .get('/quiz')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).to.be.an('array')
                done();
            });
    });


    it('it should Not UPDATE question [FAILED UPDATE QUESTION WITHOUT LOGEDIN]', (done) => {
        chai
            .request(server)
            .put('/quiz/'+q.id)
            .send(questionupdate)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should update question [SUCCESS UPDATE QUESTION]', (done) => {
        chai
            .request(server)
            .put('/quiz/'+q.id)
            .set({'x-auth-token': admin_token})
            .send(questionupdate)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    //---------------------- options --------------------------------


    it('it should not add option to question [FAILED ADD QUESTION WITOUT ADMIN]', (done) => {
        option.questionId = q.id;
        chai
            .request(server)
            .post('/quiz/option')
            .send(option)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should add option to question [SUCCESS ADD QUESTION ADMIN]', (done) => {
        option.questionId = q.id;
        chai
            .request(server)
            .post('/quiz/option')
            .set({'x-auth-token': admin_token})
            .send(option)
            .end((err, res) => {
                op = res.body.data;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('id');
                expect(res.body.data).have.property('option').equal(option.option);
                done();
            });
    });

    
    it('it should get option by question [SUCCESS GET OPTIONS BY QUESTION]', (done) => {
        
        chai
            .request(server)
            .get('/quiz/options/byquestion/'+q.id)
            .send(option)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                // expect(res.body.data).have.property('id');
                expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('it should not update option [FAILED UPDATE OPTIONS WITHOUT ADMIN]', (done) => {
        
        chai
            .request(server)
            .put('/quiz/options/'+op.id)
            .send(optionupdate)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should update option [SUCCESS UPDATE OPTIONS WITHOUT ADMIN]', (done) => {
        chai
        .request(server)
        .put('/quiz/options/'+op.id)
        .set({'x-auth-update': admin_token})
        .send(optionupdate)
        .end((err, res) => {
            expect(res).have.property('status').equal(401);
            done();
        });
    });



    it('it should not delete QUESTION [FAILED DELETE QUESTION WITHOUT LOGEDIN]', (done) => {
        chai
            .request(server)
            .delete('/quiz/'+q.id)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });


    it('it should delete question [SUCCESS DELETE QUESTION ADMIN]', (done) => {
        chai
            .request(server)            
            .delete('/quiz/'+q.id)
            .set({'x-auth-token': admin_token})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });




    it('it should not delete option [FAILED DELETE OPTIONS WITHOUT ADMIN]', (done) => {
        chai
        .request(server)
        .delete('/quiz/options/'+op.id)
        .end((err, res) => {
            expect(res).have.property('status').equal(401);
            done();
        });
        
    });


    it('it should delete option [SUCCESS DELETE OPTIONS ADMIN]', (done) => {
        chai
        .request(server)
        .delete('/quiz/options/'+op.id)
        .set({'x-auth-token': admin_token})
        .end((err, res) => {
            expect(res).have.property('status').equal(200);
            done();
        });
    });
    
});
