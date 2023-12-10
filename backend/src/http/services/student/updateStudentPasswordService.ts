import { UserInterface } from "../../interfaces/userInterface"
import { hash } from "bcryptjs"

type UpdateStudentPasswordServiceRequest = {
  email: string
  newPassword: string
}

export default class UpdateStudentPasswordService {
  constructor(private userInterface: UserInterface) {}

  async exec({ email, newPassword }: UpdateStudentPasswordServiceRequest) {
    if (!email) {
      throw {
        status: 422,
        message: "E-mail inválido.",
      }
    }

    if (!newPassword || newPassword.length < 3) {
      throw {
        status: 422,
        message: "Senha inválida.",
      }
    }

    const doesUserExists = await this.userInterface.findByEmail(email)

    if (!doesUserExists) {
      throw {
        status: 404,
        message: "Estudante não encontrado.",
      }
    }

    const hashNewPassword = await hash(newPassword, 6)

    const updatedStudentPassword = await this.userInterface.updatePassword(
      email,
      hashNewPassword
    )

    return updatedStudentPassword
  }
}
