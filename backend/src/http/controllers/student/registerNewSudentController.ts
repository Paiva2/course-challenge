import { Request, Response } from "express"
import { HttpError } from "../../@types/types"
import UserFactory from "../factory/userFactory"

export default class RegisterNewStudentController {
  public static async handle(req: Request, res: Response) {
    const { name, password } = req.body

    const { registerNewStudentService } = await UserFactory.exec()

    try {
      await registerNewStudentService.exec({
        name,
        password,
        role: "student",
      })

      return res.status(201).send({ message: "Estudante registrado com sucesso!" })
    } catch (e) {
      const error = e as HttpError

      return res.status(error.status).send({ message: error.message })
    }
  }
}
