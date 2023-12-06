import { randomUUID } from "crypto"
import { IQuestion } from "../../../@types/types"
import QuestionInterface from "../../../interfaces/questionInterface"
import prisma from "../client"

export default class QuestionModel implements QuestionInterface {
  async create(
    studentId: string,
    courseId: string,
    content: string
  ): Promise<IQuestion> {
    const [newQuestion] = await prisma.$queryRawUnsafe<IQuestion[]>(
      `INSERT INTO public.question 
      (id, question, "fkStudent", "fkCourse") 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      randomUUID(),
      content,
      studentId,
      courseId
    )

    return newQuestion
  }

  async findById(id: string): Promise<IQuestion | null> {
    const [findQuestion] = await prisma.$queryRawUnsafe<IQuestion[]>(
      `SELECT * FROM public.question WHERE id = $1`,
      id
    )

    if (!findQuestion) return null

    return findQuestion
  }

  async findAllFromCourse(courseId: string): Promise<IQuestion[]> {
    const courseQuestions = await prisma.$queryRawUnsafe<IQuestion[]>(
      `SELECT * FROM public.question WHERE "fkCourse" = $1`,
      courseId
    )

    return courseQuestions
  }

  async findAll(): Promise<IQuestion[]> {
    const allQuestions = await prisma.$queryRawUnsafe<IQuestion[]>(
      `SELECT * FROM public.question`
    )

    return allQuestions
  }
}
