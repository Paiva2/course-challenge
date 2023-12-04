import { Express } from "express"
import RegisterNewStudentController from "../controllers/registerNewSudentController"
import {
  authStudent,
  registerNewStudentDto,
  updateStudentPassword,
} from "../dto/user"
import dtoValidation from "../middleware/dtoValidation"
import UpdateStudentPasswordController from "../controllers/updateStudentPasswordController"
import AuthStudentController from "../controllers/authStudentController"

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
