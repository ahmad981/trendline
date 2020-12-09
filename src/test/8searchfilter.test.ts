
let d = new Date();

d.setDate(d.getDate() - 1);
console.log(d);
const new1 = {
    "id": 1,
    "companyId": 1,
    "title": "required front end Developer",
    "description": "We required front end developer in react angular vue html css js in lahore city for the purpose of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
    "trainingType": "Shadow",
    "trDescription": "some training description",
    "trDuration": 5,
    "noOfOpenings": 13,
    "isPaid": true,
    "hourlyRate": 14,
    "geoLocation": {
        "type": "Point",
        "coordinates": [
            74.3587,
            31.5204
        ]
    },
    "createdAt": new Date(d),
    "zipcode": 33404
};
d.setDate(d.getDate() - 1);
console.log(d);
const new2 = {
    "id": 2,
    "companyId": 1,
    "title": "required back end Developer",
    "description": "We required back end developer wth following stacks, asp.net, java, node  in karachi city for the purpose of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
    "trainingType": "Shadow",
    "trDescription": "some training description",
    "trDuration": 5,
    "noOfOpenings": 13,
    "isPaid": true,
    "hourlyRate": 14,
    "zipcode":33404,
    "geoLocation": {
        "type": "Point",
        "coordinates": [
            67.0011,
            24.8607
        ]
    },
    "createdAt": new Date(d)
};
d.setDate(d.getDate() - 1);
console.log(d);
const new3 = {
    "id": 3,
    "companyId": 1,
    "title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
    "trainingType": "Shadow",
    "trDescription": "some training description",
    "trDuration": 25,
    "noOfOpenings": 3,
    "isPaid": true,
    "hourlyRate": 9,
    "zipcode": 33405,
    "geoLocation": {
        "type": "Point",
        "coordinates": [
            73.135,
            31.4504
        ]
    },
    "createdAt": new Date(d)
};
console.log(d);
const newerjobs = [
    new1, new2, new3
]
// console.log(newerjobs);
const olderJob = [
    {
        "id": 4,
        "companyId": 1,
        "title": "required front end Developer",
        "description": "We required front end developer in react angular vue html css js in lahore city for the purpose of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
        "trainingType": "Shadow",
        "trDescription": "some training description",
        "trDuration": 5,
        "noOfOpenings": 13,
        "isPaid": true,
        "hourlyRate": 14,
        "geoLocation": {
            "type": "Point",
            "coordinates": [
                74.3587,
                31.5204
            ]
        },
        "createdAt": "2020-11-14T05:25:33.000Z",
        "zipcode":33505,
        "industry":"IT"
    },
    {
        "id": 5,
        "companyId": 1,
        "title": "required back end Developer",
        "description": "We required back end developer wth following stacks, asp.net, java, node  in karachi city for the purpose of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
        "trainingType": "Internship",
        "trDescription": "some training description",
        "trDuration": 15,
        "noOfOpenings": 13,
        "isPaid": true,
        "hourlyRate": 20,
        "zipcode":33506,
        "industry": "Construction",
        "geoLocation": {
            "type": "Point",
            "coordinates": [
                67.0011,
                24.8607
            ]
        },
        "createdAt": "2020-11-18T05:25:33.000Z",
    },
    {
        "id": 6,
        "companyId": 1,
        "title": "required graphics designer",
        "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
        "trainingType": "Shadow",
        "trDescription": "some training description",
        "trDuration": 25,
        "noOfOpenings": 3,
        "isPaid": true,
        "hourlyRate": 10,
        "zipcode":33506,
        "industry": "web developing",
        "geoLocation": {
            "type": "Point",
            "coordinates": [
                73.135,
                31.4504
            ]
        },
        "createdAt": "2020-11-13T05:25:33.000Z"
    }
]

const trShadow = "Shadow";
const trIntern = "Internship";

const murreeLatLng = { lat:33.9070, lng: 73.3943 };
const lhrlatlng = { lng: 74.3587, lat: 31.5254 };
const krchilatlng = { lng: 67.0011,at: 24.887 };
var filter = {
	
	"search": "",
	"geoLocation": {
		"lat": 0,
		"lng": 0
	},
	"radius":12,
	"trDuration": [],
	"trType": [
		],
	"hourlyRate": {
		"min": 0,
		"max": 100
	},
	"startDates":[
	]
	
	
}

const commonWords = "required candidate"; // this will fetch all results without any filter.

const jobskills = [
    
    {jobId: 1, skill: 'javascript'},
    {jobId: 1, skill: 'html'},
    {jobId: 1, skill: 'css'},
    {jobId: 1, skill: 'jquery'},

    {jobId: 2, skill: 'mysql'},
    {jobId: 2, skill: 'java'},
    {jobId: 2, skill: 'git'},
    {jobId: 2, skill: 'lint'},
    
    {jobId: 3, skill: 'adobe photoshop'},
    {jobId: 3, skill: 'adobe illustrator'},
    {jobId: 3, skill: 'corel draw'},
    {jobId: 3, skill: 'indesign'},
    {jobId: 3, skill: 'xd'},

    {jobId: 4, skill: 'javascript'},
    {jobId: 4, skill: 'html'},
    {jobId: 4, skill: 'css'},
    {jobId: 4, skill: 'jquery'},

    {jobId: 5, skill: 'mysql'},
    {jobId: 5, skill: 'java'},
    {jobId: 5, skill: 'git'},
    {jobId: 5, skill: 'lint'},
    
    {jobId: 6, skill: 'adobe photoshop'},
    {jobId: 6, skill: 'adobe illustrator'},
    {jobId: 6, skill: 'corel draw'},
    {jobId: 6, skill: 'indesign'},
    {jobId: 6, skill: 'xd'}
    
]

const startdates = [
    {jobId: 4, date: '2020-11-24', time: '12:00'},
    {jobId: 4, date: '2020-11-18', time: '14:00'},

    {jobId: 5, date: '2020-11-12', time: '16:00'},
    {jobId: 5, date: '2020-11-13', time: '12:00'},
    
    {jobId: 6, date: '2020-11-18', time: '14:00'},
    {jobId: 6, date: '2020-11-21', time: '16:00'},
]

const jobStartDates = [];
const twoskills = "html adobe"; // should get graphics designer and front end developer (id: 4, id: 6).
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
import { Question, Option, JobSkill, JobStartDate, Job } from '../apis/models';
import { seedSuperAdmin } from '../utils/seed';

const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE2MDUwNzMzMTF9.lUfzyx56Y8xPmPwuVfMiqrx4PwAm1gTqplvC7j3nw30";
const question = {question: 'is this is paid internship', type: 1};
const questionFailed = {question: 'is this is paid internship'};
const questionupdate = {question: 'is it an paid internship (updated)'};
var option = {questionId: 1, option: 'some option to question'};
var optionupdate = {questionId: 1, option: 'some updated option'};

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('SEARCH && FILTERS', () => {

    var q: any = {};
    var op: any = {};

    before( async () => {
        
        try {
                
                await Job.destroy({ where: {}});
                await JobSkill.destroy({where: {} });
                await JobStartDate.destroy({ where: {}});
                await Job.bulkCreate([...newerjobs, ...olderJob]);
                await JobStartDate.bulkCreate(jobStartDates);
                await JobSkill.bulkCreate(jobskills);
                
        } catch (error) {
            console.log('------ err ----------');
            console.log(error);
            console.log('------ err ----------');
        }
    });

    // it('it should bulk create jobs (5 day interval) ', async (done) => {
    //             await Job.bulkCreate([...newerjobs, ...olderJob]);
    //             await JobStartDate.bulkCreate(jobStartDates);
    //             await JobSkill.bulkCreate(jobskills);
    // });

    
    it('it should not search newer jobs (5 day interval) pagination included', (done) => {
        chai
            .request(server)
            .get('/jobs/search?limit=5&&page=1&&search='+commonWords)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(3);
                expect(res.body).have.property('totalDocs').equal(3);
                done();
            });
    });
    
    it('it should have data length 2 && totalDocs 3 (5 day interval) pagination included', (done) => {
        chai
            .request(server)
            .get('/jobs/search?limit=2&&page=1&&search='+commonWords)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                expect(res.body).have.property('totalDocs').equal(3);
                done();
            });
    });
    
    it('it should have data length 2 && totalDocs 3 (5 day interval) pagination included', (done) => {
        chai
            .request(server)
            .get('/jobs/search?limit=2&&page=2&&search='+commonWords)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                expect(res.body).have.property('totalDocs').equal(3);
                done();
            });
    });

    

    it('it should search & get 2 results for (html adobe) ', (done) => {
        chai
            .request(server)
            .get('/jobs/search?search='+twoskills)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });
    

    it('it should not filter [FAILED without search param(keyword) --> hrmin:0, hrMax: 200] ', (done) => {
        // filter.search = commonWords;
        chai
            .request(server)
            .post('/jobs/filter')
            .send(filter)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message').equal(`"search" is not allowed to be empty`);
                done();
            });
    });


    it('it should filter [SUCCESS --> search hrmin:0, hrMax: 200 (3 results all)] ', (done) => {
        filter.search = commonWords;
        chai
            .request(server)
            .post('/jobs/filter')
            .send(filter)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(3);
                done();
            });
    });

    it('it should filter [SUCCESS --> search hrmin:0, hrMax: 200 (total 3, page=1 limit=2, docs=2, hasNext=true, hasPrev=false)] [PAGINATION TEST] ', (done) => {
        filter.search = commonWords;
        chai
            .request(server)
            .post('/jobs/filter?page=1&&limit=2')
            .send(filter)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                expect(res.body).have.property('totalDocs').equal(3);
                expect(res.body).have.property('hasNext').equal(true);
                expect(res.body).have.property('hasPrev').equal(false);
                done();
            });
    });
    it('it should filter [SUCCESS --> search hrmin:0, hrMax: 200 (total 3, page=2 limit=2, docs=1, hasNext=false hasPrev=true))] [PAGINATION TEST] ', (done) => {
        filter.search = commonWords;
        chai
            .request(server)
            .post('/jobs/filter?page=2&&limit=2')
            .send(filter)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                expect(res.body).have.property('totalDocs').equal(3);
                expect(res.body).have.property('hasNext').equal(false);
                expect(res.body).have.property('hasPrev').equal(true);
                done();
            });
    });

    it('it should filter [SUCCESS -->radius: 10, lat & lng of lhr search hrmin:0, hrMax: 200 (1 result near lhr)] ', (done) => {
        filter.search = commonWords;
        // console.log({...filter, radius:10, geoLocation: {lat: lhrlatlng.lat, lng: lhrlatlng.lng}});
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, radius:10, geoLocation: {lat: lhrlatlng.lat, lng: lhrlatlng.lng}})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                expect(res.body.data[0]).have.property('id').equal(4)
                done();
            });
    });


    it('it should filter [SUCCESS --> trType:Shadow & hrmin:0, hrMax: 200, result 2] ', (done) => {
        filter.search = commonWords;
        // console.log({...filter, trType: [trShadow] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trType: [trShadow]})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });

    it('it should filter [SUCCESS --> trType:Internship & hrmin:0, hrMax: 200, result 1] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trType: [trShadow] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trType: [trIntern]})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                done();
            });
    });


    it('it should filter HOURLY_RATE [SUCCESS --> trType:Shadow & hrmin:5, hrMax: 20, result 2] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trType: [trShadow] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trType: [trShadow], hourlyRate:{min: 5, max: 20}})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });

    it('it should filter HOURLY_RATE [SUCCESS --> trType:Shadow & hrmin:10, hrMax: 20, result 1] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trType: [trShadow] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trType: [trShadow], hourlyRate: {min: 10, max: 20}})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });

    it('it should filter HOURLY_RATE [SUCCESS --> trType:Shadow & hrmin:25, hrMax: 120, result 0] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trType: [trShadow] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trType: [trShadow], hourlyRate: {min: 25, max: 120}})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(0);
                done();
            });
    });


    it('it should filter TRN DURATION [SUCCESS --> durations: [5] result 1] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trDuration: [5] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trDuration: [5]})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(1);
                done();
            });
    });

    it('it should filter TRN DURATION [SUCCESS --> durations: [5, 15] result 2] ', (done) => {
        filter.search = commonWords;
        console.log({...filter, trDuration: [5] });
        chai
            .request(server)
            .post('/jobs/filter')
            .send({...filter, trDuration: [5, 15]})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.an('array').length(2);
                done();
            });
    });

});
