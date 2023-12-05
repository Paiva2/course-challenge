import { Express } from "express"
import { createNewCourseDto, updateCourseDto } from "../dto/course"
import CreateNewCourseController from "../controllers/course/createNewCourseController"
import jwtCheck from "../middleware/jwtCheck"
import UpdateCourseInformationsController from "../controllers/course/updateCourseInformationsController"
import dtoValidation from "../middleware/dtoValidation"
import GetActiveCoursesController from "../controllers/course/getActiveCoursesController"
import FilterCourseController from "../controllers/course/filterCourseController"

export default function courseRoutes(app: Express) {
  app.post(
    "/course",
    [jwtCheck, dtoValidation(createNewCourseDto)],
    CreateNewCourseController.handle
  )

  app.patch(
    "/course",
    [jwtCheck, dtoValidation(updateCourseDto)],
    UpdateCourseInformationsController.handle
  )

  app.get("/courses", GetActiveCoursesController.handle)

  app.get("/course/:courseId", FilterCourseController.handle)
}
