import { Express } from "express"
import RegisterNewStudentController from "../controllers/student/registerNewSudentController"
import dtoValidation from "../middleware/dtoValidation"
import UpdateStudentPasswordController from "../controllers/student/updateStudentPasswordController"
import AuthStudentController from "../controllers/student/authStudentController"
import {
  authStudent,
  registerNewStudentDto,
  updateStudentPassword,
} from "../dto/user"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerNewStudentDto)],
    RegisterNewStudentController.handle
  )

  app.patch(
    "/password",
    [dtoValidation(updateStudentPassword)],
    UpdateStudentPasswordController.handle
  )

  app.post("/login", [dtoValidation(authStudent)], AuthStudentController.handle)
}
