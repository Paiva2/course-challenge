import { randomUUID } from "crypto"
import { IWallet } from "../../../@types/types"
import WalletInterface from "../../../interfaces/walletInterface"
import prisma from "../client"

export default class WalletModel implements WalletInterface {
  async create(userId: string): Promise<IWallet> {
    const [newUserWallet] = await prisma.$queryRawUnsafe<IWallet[]>(
      `INSERT INTO 
      public.wallet (id, total, "fkUser") 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      randomUUID(),
      0,
      userId
    )

    return newUserWallet
  }

  async insert(professorId: string, value: number): Promise<IWallet> {
    try {
      const [updateWallet] = await prisma.$queryRawUnsafe<IWallet[]>(
        `
        WITH current AS (
          SELECT total FROM public.wallet
          WHERE "fkUser" = $1
        )
        UPDATE public.wallet 
        SET total = CAST($2 AS DECIMAL(10, 2)) + (SELECT total FROM current)
        WHERE "fkUser" = $1 
        RETURNING *;
       `,
        professorId,
        value
      )

      return updateWallet
    } catch {
      await prisma.$queryRawUnsafe(`rollback to pre_removed_pending`)

      throw {
        status: 500,
        error: "Internal: Error while updating wallet balance.",
      }
    }
  }

  async getByUserId(userId: string): Promise<IWallet> {
    const [findWallet] = await prisma.$queryRawUnsafe<IWallet[]>(
      `SELECT * FROM public.wallet WHERE "fkUser" = $1`,
      userId
    )

    if (!findWallet) return null

    return findWallet
  }
}
