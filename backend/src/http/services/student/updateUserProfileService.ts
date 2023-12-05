import { IUser } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"
import { hash } from "bcryptjs"

type UpdateUserProfileServiceRequest = {
  userId: string
  fields: {
    name?: string
    password?: string
  }
}

type UpdateUserProfileServiceResponse = IUser

export default class UpdateUserProfileService {
  constructor(private userInterface: UserInterface) {}

  async exec({
    fields,
    userId,
  }: UpdateUserProfileServiceRequest): Promise<UpdateUserProfileServiceResponse> {
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

    const fieldsToUpdate = Object.keys(fields)

    if (!fieldsToUpdate.length) return doesUserExists

    if (fields.name) {
      const doesUserExistsWithThisName = await this.userInterface.findByName(
        fields.name
      )

      if (doesUserExistsWithThisName) {
        throw {
          status: 409,
          message: "Um usuário já possui esse nome cadastrado.",
        }
      }
    }

    if (fields.password) {
      const userPass = await hash(fields.password, 6)

      fields.password = userPass
    }

    let updatedUser = doesUserExists

    for (let field of fieldsToUpdate) {
      updatedUser = {
        ...updatedUser,
        [field]: fields[field as keyof typeof fields],
      }
    }

    const updateUserProfile = await this.userInterface.updateFull(updatedUser)

    return updateUserProfile
  }
}
