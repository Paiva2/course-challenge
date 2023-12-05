import { randomUUID } from "crypto"
import { IQuestionAnswer } from "../@types/types"
import { QuestionAnswerInterface } from "../interfaces/questionAnswerInterface"

export default class InMemoryQuestionAnswer implements QuestionAnswerInterface {
  private questionAnswers = [] as IQuestionAnswer[]

  async create(
    professorId: string,
    questionId: string,
    content: string
  ): Promise<IQuestionAnswer> {
    const newAnswer = {
      id: randomUUID(),
      createdAt: new Date(),
      answer: content,
      fkQuestion: questionId,
      fkProfessor: professorId,
    }

    this.questionAnswers.push(newAnswer)

    return newAnswer
  }

  async find(
    professorId: string,
    questionId: string
  ): Promise<IQuestionAnswer | null> {
    const findAnswer = this.questionAnswers.find(
      (answer) =>
        answer.fkProfessor === professorId && answer.fkQuestion === questionId
    )

    if (!findAnswer) return null

    return findAnswer
  }
}
