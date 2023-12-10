import { Express } from "express"
import FetchPaymentsController from "../controllers/admin/fetchPaymentsController"
import jwtCheck from "../middleware/jwtCheck"

export default function adminRoutes(app: Express) {
  app.get("/payments", [jwtCheck], FetchPaymentsController.handle)
}
