import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import parseJwt from "../../utils/parseJwt"
import CourseFactory from "../factory/courseFactory"

export default class UpdateCourseInformationsController {
  public static async handle(req: Request, res: Response) {
    const { courseId, fieldsToUpdate } = req.body

    const { data: professorData } = parseJwt(req.headers.authorization as string)

    const { updateCourseInformationsService } = await CourseFactory.exec()

    try {
      await updateCourseInformationsService.exec({
        courseId,
        fieldsToUpdate,
        professorId: professorData.id,
      })

      return res.status(200).send({ message: "Curso atualizado com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
