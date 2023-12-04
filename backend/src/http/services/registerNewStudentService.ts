import { IUser } from "../@types/types"
import { UserInterface } from "../interfaces/userInterface"
import { hash } from "bcryptjs"

type RegisterNewStudentServiceRequest = {
  name: string
  password: string
  role: "student" | "professor"
}

type RegisterNewStudentServiceResponse = IUser

export default class RegisterNewStudentService {
  constructor(private userInterface: UserInterface) {}

  async exec({
    name,
    password,
    role = "student",
  }: RegisterNewStudentServiceRequest): Promise<RegisterNewStudentServiceResponse> {
    if (!name || name.length < 3) {
      throw {
        status: 422,
        message: "Nome inválido.",
      }
    } else if (!password || password.length < 6) {
      throw {
        status: 422,
        message: "Senha inválida.",
      }
    }

    const doesUserWithThisNameExists = await this.userInterface.findByName(name)

    if (doesUserWithThisNameExists) {
      throw {
        status: 409,
        message: "Um estudante com esse nome já existe cadastrado.",
      }
    }

    const hashPassword = await hash(password, 6)

    const userCreated = await this.userInterface.create(name, hashPassword, role)

    return userCreated
  }
}
