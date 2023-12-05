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
}
