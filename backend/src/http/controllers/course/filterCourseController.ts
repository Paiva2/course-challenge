import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import CourseFactory from "../factory/courseFactory"

export default class FilterCourseController {
  public static async handle(req: Request, res: Response) {
    const { courseId } = req.params as unknown as { courseId: string }

    const { filterCourseService } = await CourseFactory.exec()

    try {
      const getCourse = await filterCourseService.exec({
        courseId,
      })

      return res.status(200).send(getCourse)
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
