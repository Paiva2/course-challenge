import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import FinishedPaymentFactory from "../factory/finishedPaymentFactory"
import parseJwt from "../../utils/parseJwt"

export default class FinishAPaymentController {
  public static async handle(req: Request, res: Response) {
    const { professorId, pendingPaymentId } = req.body

    const { data: userData } = parseJwt(req.headers.authorization as string)

    const { finishAPaymentService } = await FinishedPaymentFactory.exec()

    try {
      await finishAPaymentService.exec({
        adminId: userData.id,
        pendingPaymentId,
        professorId,
      })

      return res.status(200).send({ message: "Pagamento realizado com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
