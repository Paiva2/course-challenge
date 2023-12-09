import { Request, Response } from "express"
import parseJwt from "../../utils/parseJwt"
import { HttpError } from "../../@types/types"
import QuestionAnswerFactory from "../factory/questionAnswerFactory"

export default class InsertQuestionAnswerController {
  public static async handle(req: Request, res: Response) {
    const { content, courseId, questionId } = req.body

    const { data: professorData } = parseJwt(req.headers.authorization as string)

    const { insertQuestionAnswerService } = await QuestionAnswerFactory.exec()

    try {
      await insertQuestionAnswerService.exec({
        content,
        courseId,
        professorId: professorData.id,
        questionId,
      })

      return res.status(201).send({ message: "Questão respondida com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
