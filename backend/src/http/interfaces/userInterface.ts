import { IUser } from "../@types/types"

export interface UserInterface {
  create(name: string, password: string, role: string): Promise<IUser>

  findByName(name: string): Promise<IUser | null>

  updatePassword(name: string, newPassword: string): Promise<IUser>
}
