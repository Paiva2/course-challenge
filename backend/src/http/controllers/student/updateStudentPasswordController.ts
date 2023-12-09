import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import UserFactory from "../factory/userFactory"

export default class UpdateStudentPasswordController {
  public static async handle(req: Request, res: Response) {
    const { name, newPassword } = req.body

    const { updateStudentPasswordService } = await UserFactory.exec()

    try {
      await updateStudentPasswordService.exec({
        name,
        newPassword,
      })

      return res.status(200).send({ message: "Senha atualizada com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
