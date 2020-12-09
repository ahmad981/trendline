import { initOptions } from './options.model';
import { initQuestions } from './question.model';

export * from './options.model';
export * from './question.model';

export const initQuestionaries = async () => {
  await initQuestions();
  await initOptions();
};