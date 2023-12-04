import { randomUUID } from "crypto"
import { IUser } from "../@types/types"
import { UserInterface } from "../interfaces/userInterface"

export default class InMemoryUser implements UserInterface {
  private users = [] as IUser[]

  async create(name: string, password: string, role: string): Promise<IUser> {
    const newUser = {
      id: randomUUID(),
      name,
      password,
      role,
    }

    this.users.push(newUser)

    return newUser
  }

  async findByName(name: string): Promise<IUser | null> {
    const findUser = this.users.find((user) => user.name === name)

    if (!findUser) return null

    return findUser
  }

  async updatePassword(name: string, newPassword: string): Promise<IUser> {
    let userUpdated = {} as IUser

    const updatedUsers = this.users.map((user) => {
      if (user.name === name) {
        user.password = newPassword

        userUpdated = user
      }

      return user
    })

    this.users = updatedUsers

    return userUpdated
  }
}
