import { Express } from "express"
import { insertNewQuestionAnswerDto } from "../dto/questionAnswer"
import jwtCheck from "../middleware/jwtCheck"
import InsertQuestionAnswerController from "../controllers/question_answer/insertQuestionAnswerController"
import dtoValidation from "../middleware/dtoValidation"

export default function questionAnswerRoutes(app: Express) {
  app.post(
    "/question-answer",
    [jwtCheck, dtoValidation(insertNewQuestionAnswerDto)],
    InsertQuestionAnswerController.handle
  )
}
