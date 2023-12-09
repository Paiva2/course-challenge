import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import parseJwt from "../../utils/parseJwt"
import ProfessorFactory from "../factory/professorFactory"

export default class GetProfessorBalanceController {
  public static async handle(req: Request, res: Response) {
    const { data: userData } = parseJwt(req.headers.authorization as string)

    const { getProfessorBalanceService } = await ProfessorFactory.exec()

    try {
      const getBalanceView = await getProfessorBalanceService.exec({
        professorId: userData.id,
      })

      return res.status(200).send(getBalanceView)
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
