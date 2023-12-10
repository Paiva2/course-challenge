import { randomUUID } from "crypto"
import { IPendingPayments } from "../../../@types/types"
import { PendingPaymentInterface } from "../../../interfaces/pendingPaymentInterface"
import prisma from "../client"

export default class PendingPaymentModel implements PendingPaymentInterface {
  async create(
    value: number,
    reason: "course" | "questionAnswered",
    professorId: string
  ): Promise<IPendingPayments> {
    const [pendingPayment] = await prisma.$queryRawUnsafe<IPendingPayments[]>(
      `INSERT INTO public.pending_payments 
        (id, value, reason, "fkProfessor") 
        VALUES ($1, $2, CAST($3 AS "PaymentReason"), $4) 
        RETURNING *`,
      randomUUID(),
      value,
      reason,
      professorId
    )

    return pendingPayment
  }

  async findFirstByUserId(professorId: string): Promise<IPendingPayments> {
    const [professorPaymentsPending] = await prisma.$queryRawUnsafe<
      IPendingPayments[]
    >(
      `SELECT * FROM public.pending_payments
        WHERE "fkProfessor" = $1`,
      professorId
    )

    return professorPaymentsPending
  }

  async findById(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments> {
    const [pendingPayment] = await prisma.$queryRawUnsafe<IPendingPayments[]>(
      `SELECT * FROM public.pending_payments
      WHERE id = $1 AND "fkProfessor" = $2`,
      pendingPaymentId,
      professorId
    )

    return pendingPayment
  }

  async removePending(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments> {
    await prisma.$queryRawUnsafe(`BEGIN`)

    const [removedPending] = await prisma.$queryRawUnsafe<IPendingPayments[]>(
      `DELETE FROM public.pending_payments
      WHERE id = $1 AND "fkProfessor" = $2
      `,
      pendingPaymentId,
      professorId
    )

    await prisma.$queryRawUnsafe(`savepoint pre_removed_pending`)

    return removedPending
  }

  async getAllFromProfessor(professorId: string): Promise<IPendingPayments[]> {
    const allProfessorPendings = await prisma.$queryRawUnsafe<IPendingPayments[]>(
      `SELECT * FROM public.pending_payments
      WHERE "fkProfessor" = $1`,
      professorId
    )

    return allProfessorPendings
  }

  async getAll(page: number): Promise<{
    page: number
    totalPages: number
    payments: IPendingPayments[]
    totalPayments: number
  }> {
    const perPage = 10
    const offset = (page - 1) * perPage

    const pendingPayments = await prisma.$queryRawUnsafe<IPendingPayments[]>(
      `SELECT *
      FROM public.pending_payments
      ORDER BY "createdAt" DESC
      LIMIT $1
      OFFSET $2
    `,
      perPage,
      offset
    )

    const [pendingPaymentsCount] = await prisma.$queryRawUnsafe<{ count: string }[]>(
      `SELECT COUNT(*) FROM public.pending_payments`
    )

    const totalCount = Number(pendingPaymentsCount.count.toString().split("n")[0])

    const pageTotal = Math.ceil(totalCount / perPage)

    return {
      page,
      totalPayments: totalCount,
      totalPages: pageTotal,
      payments: pendingPayments,
    }
  }
}
