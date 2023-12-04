import { IUser } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"
import { compare } from "bcryptjs"

type AuthStudentServiceRequest = {
  name: string
  password: string
}

type AuthStudentServiceResponse = IUser

export default class AuthStudentService {
  constructor(private userInterface: UserInterface) {}

  async exec({
    name,
    password,
  }: AuthStudentServiceRequest): Promise<AuthStudentServiceResponse> {
    if (!name) {
      throw {
        status: 422,
        message: "Nome inválido.",
      }
    } else if (!password) {
      throw {
        status: 422,
        message: "Senha inválida.",
      }
    }

    const doesStudentExists = await this.userInterface.findByName(name)

    if (!doesStudentExists) {
      throw {
        status: 404,
        message: "Estudante não encontrado.",
      }
    }

    const doesPasswordMatches = await compare(
      password,
      doesStudentExists.password as string
    )

    if (!doesPasswordMatches) {
      throw {
        status: 403,
        message: "Credenciais inválidas.",
      }
    }

    delete doesStudentExists.password

    return doesStudentExists
  }
}
