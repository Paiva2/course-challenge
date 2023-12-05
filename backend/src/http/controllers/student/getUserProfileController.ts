import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import Factory from "../factory"

export default class GetUserProfileController {
  public static async handle(req: Request, res: Response) {
    const { userId } = req.params as unknown as { userId: string }

    const { getUserProfileService } = await Factory.exec()

    try {
      const profile = await getUserProfileService.exec({
        userId,
      })

      return res.status(200).send({ data: profile })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
