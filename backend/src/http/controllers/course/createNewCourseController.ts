import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import parseJwt from "../../utils/parseJwt"
import CourseFactory from "../factory/courseFactory"

export default class CreateNewCourseController {
  public static async handle(req: Request, res: Response) {
    const { course } = req.body

    const { data: professorData } = parseJwt(req.headers.authorization as string)

    const { createNewCourseService } = await CourseFactory.exec()

    try {
      await createNewCourseService.exec({
        course,
        professorId: professorData.id,
      })

      return res.status(201).send({ message: "Novo curso criado com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
