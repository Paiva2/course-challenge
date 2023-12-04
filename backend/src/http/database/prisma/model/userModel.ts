import { randomUUID } from "crypto"
import { IUser } from "../../../@types/types"
import { UserInterface } from "../../../interfaces/userInterface"
import prisma from "../client"

export default class UserModel implements UserInterface {
  async create(name: string, password: string, role: string): Promise<IUser> {
    const [createdUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `INSERT INTO public.user (id, name, password, role) VALUES ($1, $2, $3, $4)`,
      randomUUID(),
      name,
      password,
      role
    )

    return createdUser
  }

  async findByName(name: string): Promise<IUser | null> {
    const [findUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `SELECT * FROM public.user WHERE name = $1`,
      name
    )

    if (!findUser) return null

    return findUser
  }
}
