import { Express } from "express"
import jwtCheck from "../middleware/jwtCheck"
import GetProfessorBalanceController from "../controllers/professor/getProfessorBalanceController"

export default function professorRoutes(app: Express) {
  app.get("/my-balance", [jwtCheck], GetProfessorBalanceController.handle)
}
