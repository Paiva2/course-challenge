import { IUser } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"
import { hash } from "bcryptjs"
import WalletInterface from "../../interfaces/walletInterface"

type RegisterNewStudentServiceRequest = {
  name: string
  password: string
  email: string
  role?: "student" | "professor"
}

type RegisterNewStudentServiceResponse = IUser

export default class RegisterNewStudentService {
  constructor(
    private userInterface: UserInterface,
    private walletInterface: WalletInterface
  ) {}

  async exec({
    name,
    email,
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
    } else if (!email) {
      throw {
        status: 422,
        message: "E-mail inválido.",
      }
    }

    const doesUserWithThisNameExists = await this.userInterface.findByName(name)

    const doesUserWithThisEmailExists = await this.userInterface.findByEmail(email)

    if (doesUserWithThisNameExists) {
      throw {
        status: 409,
        message: "Um estudante com esse nome já existe cadastrado.",
      }
    } else if (doesUserWithThisEmailExists) {
      throw {
        status: 409,
        message: "Um estudante com esse e-mail já existe cadastrado.",
      }
    }

    const hashPassword = await hash(password, 6)

    const userCreated = await this.userInterface.create(
      name,
      email,
      hashPassword,
      role
    )

    await this.walletInterface.create(userCreated.id as string)

    return userCreated
  }
}
