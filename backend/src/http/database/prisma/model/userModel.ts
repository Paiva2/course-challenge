import { randomUUID } from "crypto"
import { IUser } from "../../../@types/types"
import { UserInterface } from "../../../interfaces/userInterface"
import prisma from "../client"

export default class UserModel implements UserInterface {
  async create(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<IUser> {
    const [createdUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `INSERT INTO public.user 
      (id, name, password, role, email) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      randomUUID(),
      name,
      password,
      role,
      email
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

  async findByEmail(email: string): Promise<IUser | null> {
    const [findUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `SELECT * FROM public.user WHERE email = $1`,
      email
    )

    if (!findUser) return null

    return findUser
  }

  async updatePassword(email: string, newPassword: string): Promise<IUser> {
    const [updatedUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `UPDATE public.user SET password = $2 WHERE email = $1 RETURNING *`,
      email,
      newPassword
    )

    return updatedUser
  }

  async findById(userId: string): Promise<IUser | null> {
    const [findUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `SELECT * FROM public.user WHERE id = $1`,
      userId
    )

    if (!findUser) return null

    return findUser
  }

  async updateFull(user: IUser): Promise<IUser> {
    const [updatedUser] = await prisma.$queryRawUnsafe<IUser[]>(
      `UPDATE public.user SET (name, password) = ($2, $3)
     WHERE id = $1 
     RETURNING *`,
      user.id,
      user.name,
      user.password
    )

    return updatedUser
  }
}
