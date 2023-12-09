import { randomUUID } from "crypto"
import { IUser } from "../@types/types"
import { UserInterface } from "../interfaces/userInterface"

export default class InMemoryUser implements UserInterface {
  private users = [] as IUser[]

  async create(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<IUser> {
    const newUser = {
      id: randomUUID(),
      name,
      email,
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

  async findByEmail(email: string): Promise<IUser> {
    const findUser = this.users.find((user) => user.email === email)

    if (!findUser) return null

    return findUser
  }

  async updatePassword(email: string, newPassword: string): Promise<IUser> {
    let userUpdated = {} as IUser

    const updatedUsers = this.users.map((user) => {
      if (user.email === email) {
        user.password = newPassword

        userUpdated = user
      }

      return user
    })

    this.users = updatedUsers

    return userUpdated
  }

  async findById(userId: string): Promise<IUser | null> {
    const findUserById = this.users.find((user) => user.id === userId)

    if (!findUserById) return null

    return findUserById
  }

  async updateFull(user: IUser): Promise<IUser> {
    let updatedUser = {} as IUser

    const updateUsers = this.users.map((userOnbase) => {
      if (userOnbase.id === user.id) {
        userOnbase = user

        updatedUser = userOnbase
      }

      return userOnbase
    })

    this.users = updateUsers

    return updatedUser
  }
}
