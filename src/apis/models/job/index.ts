import { Job, init } from './job.model';
import { initJobPhotos, JobPhotos } from './jobPhotos.model';
import { initJobQuestions, JobQuestions } from './jobQuestions.model';
import { initJobSkills, JobSkill } from './jobSkill.model';
import { initJobStartDate, JobStartDate } from './jobStartDates.model';

export * from './job.model';
export * from './jobPhotos.model';
export * from './jobQuestions.model';
export * from './jobSkill.model';
export * from './jobStartDates.model';





export const initJob = async () => {
  await init();
  await initJobPhotos();
  await initJobQuestions();
  await initJobSkills();
  await initJobStartDate();



  Job.hasMany(JobPhotos, { foreignKey: 'jobId', as: 'photos' });
  Job.hasMany(JobStartDate, { foreignKey: 'jobId', as: 'startDates' });
  Job.hasMany(JobQuestions, { foreignKey: 'jobId', as: 'questions' });
  Job.hasMany(JobSkill, { foreignKey: 'jobId', as: 'skills' });

};