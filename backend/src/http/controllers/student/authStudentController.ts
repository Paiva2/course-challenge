import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import jwt from "jsonwebtoken"
import UserFactory from "../factory/userFactory"

export default class AuthStudentController {
  public static async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const { authStudentService } = await UserFactory.exec()

    try {
      const authUser = await authStudentService.exec({
        email,
        password,
      })

      const jwtToken = jwt.sign(
        {
          data: {
            id: authUser.id,
            name: authUser.name,
            role: authUser.role,
          },
          expiresIn: "7d",
        },

        process.env.JWT_SECRET as string
      )

      return res.status(200).send({ token: jwtToken })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
