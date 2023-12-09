import { Express } from "express"
import { finishAPaymentDto } from "../dto/finishedPayments"
import jwtCheck from "../middleware/jwtCheck"
import FinishAPaymentController from "../controllers/finished_payments/finishAPaymentController"
import dtoValidation from "../middleware/dtoValidation"

export default function finishedPaymentsRoutes(app: Express) {
  app.post(
    "/finish-payment",
    [jwtCheck, dtoValidation(finishAPaymentDto)],
    FinishAPaymentController.handle
  )
}
