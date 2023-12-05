import { Express } from "express"
import RegisterNewStudentController from "../controllers/student/registerNewSudentController"
import dtoValidation from "../middleware/dtoValidation"
import UpdateStudentPasswordController from "../controllers/student/updateStudentPasswordController"
import AuthStudentController from "../controllers/student/authStudentController"
import {
  authStudentDto,
  registerNewStudentDto,
  updateStudentPasswordDto,
} from "../dto/user"
import GetUserProfileController from "../controllers/student/getUserProfileController"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerNewStudentDto)],
    RegisterNewStudentController.handle
  )

  app.patch(
    "/password",
    [dtoValidation(updateStudentPasswordDto)],
    UpdateStudentPasswordController.handle
  )

  app.post("/login", [dtoValidation(authStudentDto)], AuthStudentController.handle)

  app.get("/user/:userId", GetUserProfileController.handle)
}
