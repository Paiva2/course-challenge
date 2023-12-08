import { randomUUID } from "crypto"
import { IQuestionAnswer } from "../../../@types/types"
import { QuestionAnswerInterface } from "../../../interfaces/questionAnswerInterface"
import prisma from "../client"

export default class QuestionAnswerModel implements QuestionAnswerInterface {
  async create(
    courseId: string,
    professorId: string,
    questionId: string,
    content: string,
    professorName: string
  ): Promise<IQuestionAnswer> {
    const [newQuestionAnswer] = await prisma.$queryRawUnsafe<IQuestionAnswer[]>(
      `INSERT INTO public.question_answer 
        (id, answer, "fkQuestion", "fkProfessor", "fkCourse", name) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
      randomUUID(),
      content,
      questionId,
      professorId,
      courseId,
      professorName
    )

    return newQuestionAnswer
  }

  async find(
    professorId: string,
    questionId: string
  ): Promise<IQuestionAnswer | null> {
    const [findAnswer] = await prisma.$queryRawUnsafe<IQuestionAnswer[]>(
      `SELECT * FROM public.question_answer WHERE "fkProfessor" = $1 AND "fkQuestion" = $2`,
      professorId,
      questionId
    )

    if (!findAnswer) return null

    return findAnswer
  }

  async findAllFromQuestion(courseId: string): Promise<IQuestionAnswer[]> {
    const findAnswer = await prisma.$queryRawUnsafe<IQuestionAnswer[]>(
      `SELECT * FROM public.question_answer WHERE "fkCourse" = $1`,
      courseId
    )

    return findAnswer
  }
}
