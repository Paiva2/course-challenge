import { randomUUID } from "crypto"
import { IFinishedPayments } from "../../../@types/types"
import FinishedPaymentsInterface from "../../../interfaces/finishedPaymentsInterface"
import prisma from "../client"

export default class FinishedPaymentsModel implements FinishedPaymentsInterface {
  async create(
    professorId: string,
    value: number,
    reason: "course" | "questionAnswered"
  ): Promise<IFinishedPayments> {
    try {
      const [finishedPayment] = await prisma.$queryRawUnsafe<IFinishedPayments[]>(
        `INSERT INTO public.finished_payments 
          (id, value, reason, "fkProfessor") 
          VALUES ($1, $2, CAST($3 AS "PaymentReason"), $4) 
          RETURNING *`,
        randomUUID(),
        value,
        reason,
        professorId
      )

      await prisma.$queryRawUnsafe(`commit`)

      return finishedPayment
    } catch {
      await prisma.$queryRawUnsafe(`rollback to pre_removed_pending`)

      throw {
        status: 500,
        error: "Internal: Error while updating payment status.",
      }
    }
  }

  async getAllFromProfessor(professorId: string): Promise<IFinishedPayments[]> {
    const allProfessorPendings = await prisma.$queryRawUnsafe<IFinishedPayments[]>(
      `SELECT * FROM public.finished_payments
      WHERE "fkProfessor" = $1`,
      professorId
    )

    return allProfessorPendings
  }
}
