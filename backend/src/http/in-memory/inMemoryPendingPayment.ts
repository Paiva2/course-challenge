import { randomUUID } from "crypto"
import { IPendingPayments } from "../@types/types"
import { PendingPaymentInterface } from "../interfaces/pendingPaymentInterface"

export default class InMemoryPendingPayments implements PendingPaymentInterface {
  private pendingPayments = [] as IPendingPayments[]

  async create(
    value: number,
    reason: "course" | "questionAnswered",
    professorId: string
  ): Promise<IPendingPayments> {
    const newPendingPayment = {
      id: randomUUID(),
      createdAt: new Date(),
      value,
      reason,
      fkProfessor: professorId,
    }

    this.pendingPayments.push(newPendingPayment)

    return newPendingPayment
  }

  async findByUserId(professorId: string): Promise<IPendingPayments | null> {
    const findPayment = this.pendingPayments.find(
      (payment) => payment.fkProfessor === professorId
    )

    if (!findPayment) return null

    return findPayment
  }
}
