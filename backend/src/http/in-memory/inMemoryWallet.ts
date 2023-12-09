import { randomUUID } from "crypto"
import { IWallet } from "../@types/types"
import WalletInterface from "../interfaces/walletInterface"

export default class InMemoryWallet implements WalletInterface {
  private wallets = [] as IWallet[]

  async create(userId: string): Promise<IWallet> {
    const newWallet = {
      id: randomUUID(),
      total: 0,
      updatedAt: new Date(),
      fkUser: userId,
    }

    this.wallets.push(newWallet)

    return newWallet
  }

  async insert(professorId: string, value: number): Promise<IWallet> {
    let getWalletUpdated: IWallet

    const updateUserWallet = this.wallets.map((wallet) => {
      if (wallet.fkUser === professorId) {
        wallet.total = wallet.total + Number(value)

        wallet.updatedAt = new Date()

        getWalletUpdated = wallet
      }

      return wallet
    })

    this.wallets = updateUserWallet

    return getWalletUpdated
  }

  async getByUserId(userId: string): Promise<IWallet> {
    const findUserWallet = this.wallets.find((wallet) => wallet.fkUser === userId)

    return findUserWallet
  }
}
