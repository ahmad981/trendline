import { Option, Question, QuestionInterface } from '../../models';
import { OptionController } from './options.controller';

export class QuestionController extends OptionController {
  public findAll(): Promise<Question[]> {
    return Question.findAll({
      where: {},
      include: {
        model: Option,
        as: 'options',
        attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
      },
    });
  }

  public getQuestionById(id: number): Promise<Question> {
    return Question.findOne({
      where: {
        id,
      },
      include: {
        model: Option,
        as: 'options',
        attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
      },
    });
  }

  public create(question: QuestionInterface): Promise<Question> {
    return Question.create<Question>(question);
  }

  public updateQuestion(question: QuestionInterface, id: number): Promise<[number, Question[]]> {
    return Question.update(question, { where: { id } });
  }

  public getQuestionsByCategory(id: number ): Promise<QuestionInterface[]> {
    return Question.findAll({
      where: {category: id},
      include: {
        model: Option,
        as: 'options',
        attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
      },
    });
  }
  
  public removeQuestionsByCategory(id: number ): Promise<number> {
    return Question.destroy({where: {category: id}});
  }

  public removeOne(id: number): Promise<number> {
    return Question.destroy({ where: { id } });
  }

}
