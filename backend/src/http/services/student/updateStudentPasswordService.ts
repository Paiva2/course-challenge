import { UserInterface } from "../../interfaces/userInterface"
import { hash } from "bcryptjs"

type UpdateStudentPasswordServiceRequest = {
  name: string
  newPassword: string
}

export default class UpdateStudentPasswordService {
  constructor(private userInterface: UserInterface) {}

  async exec({ name, newPassword }: UpdateStudentPasswordServiceRequest) {
    if (!name || name.length < 3) {
      throw {
        status: 422,
        message: "Nome inválido.",
      }
    } else if (!newPassword || newPassword.length < 3) {
      throw {
        status: 422,
        message: "Senha inválida.",
      }
    }

    const doesUserExists = await this.userInterface.findByName(name)

    if (!doesUserExists) {
      throw {
        status: 404,
        message: "Estudante não encontrado.",
      }
    }

    const hashNewPassword = await hash(newPassword, 6)

    const updatedStudentPassword = await this.userInterface.updatePassword(
      name,
      hashNewPassword
    )

    return updatedStudentPassword
  }
}
