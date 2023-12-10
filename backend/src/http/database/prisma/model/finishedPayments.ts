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

  async getAll(page: number): Promise<{
    page: number
    totalPages: number
    payments: IFinishedPayments[]
    totalPayments: number
  }> {
    const perPage = 10
    const offset = (page - 1) * perPage

    const finishedPayments = await prisma.$queryRawUnsafe<IFinishedPayments[]>(
      `SELECT *
    FROM public.finished_payments
    ORDER BY "createdAt" DESC
    LIMIT $1
    OFFSET $2
  `,
      perPage,
      offset
    )

    const [finishedPaymentsCount] = await prisma.$queryRawUnsafe<
      { count: string }[]
    >(`SELECT COUNT(*) FROM public.finished_payments`)

    const totalCount = Number(finishedPaymentsCount.count.toString().split("n")[0])
    const pageTotal = Math.ceil(totalCount / perPage)

    return {
      page,
      totalPayments: totalCount,
      totalPages: pageTotal,
      payments: finishedPayments,
    }
  }
}
