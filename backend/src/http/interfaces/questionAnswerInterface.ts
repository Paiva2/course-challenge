import { IQuestionAnswer } from "../@types/types"

export interface QuestionAnswerInterface {
  create(
    courseId: string,
    professorId: string,
    questionId: string,
    content: string
  ): Promise<IQuestionAnswer>

  find(professorId: string, questionId: string): Promise<IQuestionAnswer | null>

  findAllFromQuestion(courseId: string): Promise<IQuestionAnswer[]>
}
