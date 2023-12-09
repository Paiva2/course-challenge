import { IUser } from "../@types/types"

export interface UserInterface {
  create(name: string, email: string, password: string, role: string): Promise<IUser>

  findByName(name: string): Promise<IUser | null>

  findByEmail(email: string): Promise<IUser | null>

  updatePassword(email: string, newPassword: string): Promise<IUser>

  findById(userId: string): Promise<IUser | null>

  updateFull(user: IUser): Promise<IUser>
}
