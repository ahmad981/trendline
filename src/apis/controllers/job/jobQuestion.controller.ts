import { JobQuestions, JobQuestionsInterface } from '../../models';

export class JobQuestionController {
  
  public addJobQuestion(questions: JobQuestionsInterface): Promise<JobQuestionsInterface> {
    return JobQuestions.create(questions);
  }

  public addJobQuestions(questions: JobQuestionsInterface[]): Promise<JobQuestionsInterface[]> {
    return JobQuestions.bulkCreate(questions);
  }

  public updateJobQuestion(id: number, questions: JobQuestionsInterface): Promise<[number, JobQuestionsInterface[]]> {
    return JobQuestions.update(questions, {where: {id}});
  }

  public removeJobQuestion(id: number): Promise<number> {
    return JobQuestions.destroy({where: {id}});
  }

  public removeQuestionsByJob(id: number) : Promise<number> {
    return JobQuestions.destroy({where: {jobId: id}});
  }
}
