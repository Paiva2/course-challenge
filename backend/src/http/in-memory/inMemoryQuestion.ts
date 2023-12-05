import { randomUUID } from "crypto"
import { IQuestion } from "../@types/types"
import QuestionInterface from "../interfaces/questionInterface"

export default class InMemoryQuestion implements QuestionInterface {
  private questions = [] as IQuestion[]

  async create(
    studentId: string,
    courseId: string,
    content: string
  ): Promise<IQuestion> {
    const newQuestion = {
      id: randomUUID(),
      createdAt: new Date(),
      question: content,
      fkStudent: studentId,
      fkCourse: courseId,
    }

    this.questions.push(newQuestion)

    return newQuestion
  }
}
