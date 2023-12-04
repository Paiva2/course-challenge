import { Express } from "express"
import RegisterNewStudentController from "../controllers/registerNewSudentController"
import { registerNewStudentDto, updateStudantPassword } from "../dto/user"
import dtoValidation from "../middleware/dtoValidation"
import UpdateStudentPasswordController from "../controllers/updateStudentPasswordController"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerNewStudentDto)],
    RegisterNewStudentController.handle
  )

  app.patch(
    "/password",
    [dtoValidation(updateStudantPassword)],
    UpdateStudentPasswordController.handle
  )
}
