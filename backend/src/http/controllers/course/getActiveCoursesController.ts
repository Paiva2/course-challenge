import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import CourseFactory from "../factory/courseFactory"

export default class GetActiveCoursesController {
  public static async handle(req: Request, res: Response) {
    const { page } = req.query as unknown as { page: string }

    const { getActiveCoursesService } = await CourseFactory.exec()

    try {
      const coursesData = await getActiveCoursesService.exec({
        page: +page || 1,
      })

      return res.status(200).send(coursesData)
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
