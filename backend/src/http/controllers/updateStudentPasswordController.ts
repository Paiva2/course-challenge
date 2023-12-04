import { Request, Response } from "express"
import { HttpError } from "../@types/types"
import Factory from "./factory"

export default class UpdateStudentPasswordController {
  public static async handle(req: Request, res: Response) {
    const { name, newPassword } = req.body

    const { updateStudentPasswordService } = await Factory.exec()

    try {
      await updateStudentPasswordService.exec({
        name,
        newPassword,
      })

      return res.status(204).send({ message: "Senha atualizada com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
