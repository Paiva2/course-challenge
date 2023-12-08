import { randomUUID } from "crypto"
import { IQuestion } from "../@types/types"
import QuestionInterface from "../interfaces/questionInterface"

export default class InMemoryQuestion implements QuestionInterface {
  private questions = [] as IQuestion[]

  async create(
    studentId: string,
    courseId: string,
    content: string,
    name: string
  ): Promise<IQuestion> {
    const newQuestion = {
      id: randomUUID(),
      createdAt: new Date(),
      question: content,
      fkStudent: studentId,
      fkCourse: courseId,
      name,
    }

    this.questions.push(newQuestion)

    return newQuestion
  }

  async findById(id: string): Promise<IQuestion | null> {
    const findQuestion = this.questions.find((question) => question.id === id)

    if (!findQuestion) return null

    return findQuestion
  }

  async findAllFromCourse(courseId: string): Promise<IQuestion[]> {
    const getAllQuestionsFromCourse = this.questions.filter((question) => {
      return question.fkCourse === courseId
    })

    return getAllQuestionsFromCourse
  }

  async findAll(): Promise<IQuestion[]> {
    return this.questions
  }
}
