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

  async findFirstByUserId(professorId: string): Promise<IPendingPayments | null> {
    const findPayment = this.pendingPayments.find(
      (payment) => payment.fkProfessor === professorId
    )

    if (!findPayment) return null

    return findPayment
  }

  async findById(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments> {
    const findPending = this.pendingPayments.find(
      (pendingPayment) =>
        pendingPayment.id === pendingPaymentId &&
        pendingPayment.fkProfessor === professorId
    )

    if (!findPending) return null

    return findPending
  }

  async removePending(
    professorId: string,
    pendingPaymentId: string
  ): Promise<IPendingPayments> {
    const findPending = this.pendingPayments.find(
      (pendingPayment) =>
        pendingPayment.fkProfessor === professorId &&
        pendingPayment.id === pendingPaymentId
    )

    const getPendingPos = this.pendingPayments.indexOf(findPending)

    this.pendingPayments.splice(getPendingPos, 1)

    return findPending
  }

  async getAll() {
    return this.pendingPayments
  }
}
