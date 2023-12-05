import { Express } from "express"
import { insertNewQuestionDto } from "../dto/question"
import jwtCheck from "../middleware/jwtCheck"
import InsertNewQuestionController from "../controllers/question/insertNewQuestionController"
import dtoValidation from "../middleware/dtoValidation"

export default function questionRoutes(app: Express) {
  app.post(
    "/question",
    [jwtCheck, dtoValidation(insertNewQuestionDto)],
    InsertNewQuestionController.handle
  )
}
