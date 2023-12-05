import { IUser } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"

type GetUserProfileServiceRequest = {
  userId: string
}

type GetUserProfileServiceResponse = IUser

export default class GetUserProfileService {
  constructor(private userInterface: UserInterface) {}

  async exec({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    if (!userId) {
      throw {
        status: 422,
        message: "Id do usuário inválido.",
      }
    }

    const doesUserExists = await this.userInterface.findById(userId)

    if (!doesUserExists) {
      throw {
        status: 404,
        message: "Usuário não encontrado.",
      }
    }

    delete doesUserExists.password

    return doesUserExists
  }
}
