import { Express } from "express"
import CreateNewCourseController from "../controllers/course/createNewCourseController"
import jwtCheck from "../middleware/jwtCheck"

export default function courseRoutes(app: Express) {
  app.post("/course", [jwtCheck], CreateNewCourseController.handle)
}
