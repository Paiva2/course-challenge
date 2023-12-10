import { Request, Response } from "express"
import parseJwt from "../../utils/parseJwt"
import { HttpError } from "../../@types/types"
import AdminFactory from "../factory/adminFactory"

export default class FetchPaymentsController {
  public static async handle(req: Request, res: Response) {
    const { type, page } = req.query as unknown as {
      type: "pending" | "finished"
      page: string
    }

    const { data: userData } = parseJwt(req.headers.authorization as string)

    const { fetchPaymentsService } = await AdminFactory.exec()

    try {
      const list = await fetchPaymentsService.exec({
        adminId: userData.id,
        page: +page,
        paymentType: type,
      })

      return res.status(200).send(list)
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
