import { Express } from "express"
import RegisterNewStudentController from "../controllers/registerNewSudentController"
import { registerNewStudentDto } from "../dto/user"
import dtoValidation from "../middleware/dtoValidation"

export default function userRoutes(app: Express) {
  app.post(
    "/register",
    [dtoValidation(registerNewStudentDto)],
    RegisterNewStudentController.handle
  )
}
