import { Express } from "express"
import adminRoutes from "./adminRoutes"
import courseRoutes from "./courseRoutes"
import finishedPaymentsRoutes from "./finishedPaymentsRoutes"
import professorRoutes from "./professorRoutes"
import questionAnswerRoutes from "./questionAnswerRoutes"
import questionRoutes from "./questionRoutes"
import userRoutes from "./userRoutes"

export default function handleRoutes(app: Express) {
  userRoutes(app)

  courseRoutes(app)

  questionRoutes(app)

  questionAnswerRoutes(app)

  finishedPaymentsRoutes(app)

  professorRoutes(app)

  adminRoutes(app)
}
