import { IPendingPayments } from "../@types/types"

export interface PendingPaymentInterface {
  create(
    value: number,
    reason: "course" | "questionAnswered",
    professorId: string
  ): Promise<IPendingPayments>

  findByUserId(professorId: string): Promise<IPendingPayments | null>

  findById(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments | null>

  removePending(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments>
}
