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

  async findByUserId(professorId: string): Promise<IPendingPayments> {
    const [professorPaymentsPending] = await prisma.$queryRawUnsafe<
      IPendingPayments[]
    >(
      `SELECT * FROM public.pending_payments
        WHERE "fkProfessor" = $1`,
      professorId
    )

    return professorPaymentsPending
  }
}
