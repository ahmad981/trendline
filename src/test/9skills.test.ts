const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";

process.env.NODE_ENV = 'testing';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiHttp = require('chai-http');
import { expect, should } from 'chai';
import server from '../app';
import { Organization, Skill, SkillInterface } from '../apis/models';

const skill1 = {name: 'java'};
const sks = [
    {name : "powerpoint"},
    {name: "javascript"},
    {name: "android"},
    {name: "typescript"},
    {name: "designing"},
    {name: "archetecting"}
]


chai.use(chaiHttp);
/*
 * Test the /GET route
 */
describe('SKILLS', () => {
    var skill:SkillInterface;
    before((done) => {
        Skill.destroy({ where: {} })
            .then(async (res) => {
                await Skill.bulkCreate(sks);
                done();
            })
            .catch(done);
    });

    it('it should not create new Skill with out admin [CREATE FAILED WITHOUT ADMIN]', (done) => {
        chai
            .request(server)
            .post('/skill')
            .send(skill1)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should create new skill', (done) => {
        chai
            .request(server)
            .post('/skill')
            .set({ 'x-auth-token': admin_token })
            .send(skill1)
            .end((err, res) => {
                skill = res.body.data;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('id');
                expect(res.body.data).have.property('name');
                expect(res.body.data).have.property('createdAt');
                expect(res.body.data).have.property('updatedAt');
                done();
            });
    });

    it('it should get skills', (done) => {
        chai
            .request(server)
            .get('/skill')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array');
                done();
            });
    });
    
    it('it should search skills', (done) => {
        chai
            .request(server)
            .get('/skill/search?search=script')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });
    
    it('it should search skills', (done) => {
        chai
            .request(server)
            .get('/skill/search?search=java')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });
    
    it('it should search skills', (done) => {
        chai
            .request(server)
            .get('/skill/search?search=arc')
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                done();
            });
    });

    it('it should update skills', (done) => {
        chai
            .request(server)
            .put('/skill/'+skill.id)
            .set({'x-auth-token': admin_token})
            .send({name: 'java updated'})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

   
    it('it should delete skill', (done) => {
        chai
            .request(server)
            .delete('/skill/' + skill.id)
            .set({ 'x-auth-token': admin_token })
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });
});
