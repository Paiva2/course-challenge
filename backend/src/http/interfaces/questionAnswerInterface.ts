import { IQuestionAnswer } from "../@types/types"

export interface QuestionAnswerInterface {
  create(
    professorId: string,
    questionId: string,
    content: string
  ): Promise<IQuestionAnswer>

  find(professorId: string, questionId: string): Promise<IQuestionAnswer | null>
}
