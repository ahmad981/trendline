/**
 * 1. create job ( with 4 variations )
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
import { Job, User } from '../apis/models';
import { create } from 'domain';

const job = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

};

const job_no_title = { 
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

}

const job_no_desc = { 
	"title": "required graphics designer",
    "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []
}

const job_no_trt = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

}

const job_no_duration = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDescription": "some training description" ,
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": [],
}

const job_no_trdesc = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
    "noOfOpenings": 3,
    "trainingType": "Shadow",
    "isPaid": true,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

}

const job_no_ispaid = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "hourlyRate": 9,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

};


const job_no_hr = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

};

const job_no_skills = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

};
const job_no_stds = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}],
    "photos": []

};
const job_no_qs = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "photos": []

};
const job_no_phs = { 
	"title": "required graphics designer",
    "description": "We required graphics designer in faisalabad, candidate must have a strong grip on adobe illustrator, adobe photoshop and must have design sense, color sense, and a little bit graphics desgning theory of digital marketing and advertising purposes. that must be expert in creating stunning posts, ads, portfolios, portraits and much more. must have design sense and color sense. ",
     "noOfOpenings": 3,
     "trainingType": "Shadow",
     "trDuration": 25,
     "trDescription": "some training description" ,
    "isPaid": true,
    "skills": ["mongodb", "angular", "apples", "auto", "apple laptops", "simulations"],
    "startDates": [
    	{
     "date": "11/25/2020",
     "time": "12:00"
	}, {
		"date": "11/25/2020",
		"time": "14:00"
	}	
    ],
    "questions": [
    	{"question": "is it paid ?", "answer": "yes"}]

};




const emp = {
    email: 'empl@gmail.com',
    password: '123123',
}
const jobskill1 = {skill: 'mongodb'};
const jobskill2 = {skill: 'Git'};
const startdate = {
    "date": "11/28/2020",
    "time": "12:00"
};
const question = { question: 'isPaid', answer: 'false' }

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('JOB', () => {

    var ind: any = {};
    var emp_token = "";
    var created_job : any = {};
    var skill : any  = {};
    var created_date : any = {};
    var created_question : any = {};

    before((done) => {
        
        Job.destroy({ where: {} })
            .then((err) => {
                done();
            })
            .catch(done);
    });

    it('login as employer', (done) => {
        chai 
        .request(server)
        .post('/user/login')
        .send({email:emp.email, password: emp.password})
        .end((err, res) => {
            emp_token = res.body.token; 
            expect(res).have.property('status').equal(200);
            done()
        })

    })

    it('it should failed create job [WITHOUT LOGEDIN]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .send(job)
            .end((err, res) => {
                expect(res).have.property('status').equal(401);
                done();
            });
    });

    it('it should failed create job [WITHOUT TITLE]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_title)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT DESCRIPTION]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_desc)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT TRAINING TYPE]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_trt)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT TRAINING DESCRIPTION]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_trdesc)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT TRAINING DURATION]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_duration)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT TRAINING DURATION]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_duration)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT ISPAID STATIS]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_ispaid)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT HOURLU RATE]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_hr)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT Skills]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_skills)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT JOPHOTOS]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_phs)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT START DATES]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_stds)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });

    it('it should failed create job [WITHOUT START QUESTIONS]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job_no_qs)
            .end((err, res) => {
                expect(res).have.property('status').equal(422);
                expect(res.body).have.property('message');
                done();
            });
    });


    it('it should successfully create job [SUCCESS CREATE JOB]', (done) => {
        chai
            .request(server)
            .post('/jobs')
            .set({'x-auth-token': emp_token})
            .send(job)
            .end((err, res) => {
                created_job = res.body.data;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('title').equal(job.title);
                done();
            });
    });
    
    it('it should Add skill to job [SUCCESS ADD JOB SKILL]', (done) => {
        chai
            .request(server)
            .post('/jobs/add/oneskill?jobID='+created_job.id)
            .set({'x-auth-token': emp_token})
            .send(jobskill1)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('jobId').equal(created_job.id);
                expect(res.body.data).have.property('skill').equal(jobskill1.skill);
                done();
            });
    });

    it('it should Add skill 2 to job [SUCCESS ADD JOB SKILL]', (done) => {
        chai
            .request(server)
            .post('/jobs/add/oneskill?jobID='+created_job.id)
            .set({'x-auth-token': emp_token})
            .send(jobskill2)
            .end((err, res) => {
                skill = res.body.data;
                expect(res).have.property('status').equal(200);
                expect(res.body.data).have.property('jobId').equal(created_job.id);
                expect(res.body.data).have.property('skill').equal(jobskill2.skill);
                done();
            });
    });
    
    it('it should remove jobskill to job [SUCCESS DELETE JOB SKILL]', (done) => {
        chai
            .request(server)
            .delete('/jobs/delete/skills/'+ skill.id)
            .set({'x-auth-token': emp_token})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });


    it('it should Add startdate to job [SUCCESS ADD STARTDATE]', (done) => {
        chai
            .request(server)
            .post('/jobs/add/startdate/single?jobID='+created_job.id)
            .set({'x-auth-token': emp_token})
            .send(startdate)
            .end((err, res) => {
                created_date = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    });
    
    it('it should remove startdate to job [SUCCESS DELETE STARTDATE]', (done) => {
        chai
            .request(server)
            .delete('/jobs/delete/startdate/'+created_date.id)
            .set({'x-auth-token': emp_token})
            .send(startdate)
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });

    it('it should Add question to job [SUCCESS ADD JOB QUESTION]', (done) => {
        chai
            .request(server)
            .post('/jobs/add/questions?jobID='+created_job.id)
            .set({'x-auth-token': emp_token})
            .send(question)
            .end((err, res) => {
                created_question = res.body.data;
                expect(res).have.property('status').equal(200);
                done();
            });
    
    });

    it('it should Remove question to job [SUCCESS REMOVE JOB QUESTION]', (done) => {
        chai
            .request(server)
            .delete('/jobs/delete/questions/'+created_question.id)
            .set({'x-auth-token': emp_token})
            .end((err, res) => {
                expect(res).have.property('status').equal(200);
                done();
            });
    });
    
    // it('it should Add photos to job [SUCCESS ADD JOB PHOTOS]', (done) => {
        
    // });




});
