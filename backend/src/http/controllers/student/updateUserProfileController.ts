import { Request, Response } from "express"
import parseJwt from "../../utils/parseJwt"
import Factory from "../factory"
import { HttpError } from "../../@types/types"

export default class UpdateUserProfileController {
  public static async handle(req: Request, res: Response) {
    const { fields } = req.body

    const { data: userData } = parseJwt(req.headers.authorization as string)

    const { updateUserProfileService } = await Factory.exec()

    try {
      await updateUserProfileService.exec({
        fields,
        userId: userData.id,
      })

      return res.status(200).send({ message: "Usuário atualizado com sucesso." })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
