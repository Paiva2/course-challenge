import { IWallet } from "../@types/types"

export default interface WalletInterface {
  insert(professorId: string, value: number): Promise<IWallet>

  getByUserId(userId: string): Promise<IWallet>

  create(userId: string): Promise<IWallet>
}
