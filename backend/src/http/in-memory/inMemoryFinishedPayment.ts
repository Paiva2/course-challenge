import { randomUUID } from "crypto"
import { IFinishedPayments } from "../@types/types"
import FinishedPaymentsInterface from "../interfaces/finishedPaymentsInterface"

export default class InMemoryFinishedPayment implements FinishedPaymentsInterface {
  private finishedPayments = [] as IFinishedPayments[]

  async create(
    professorId: string,
    value: number,
    reason: string
  ): Promise<IFinishedPayments> {
    const newFinishedPayment = {
      id: randomUUID(),
      createdAt: new Date(),
      value,
      reason,
      fkProfessor: professorId,
    }

    this.finishedPayments.push(newFinishedPayment)

    return newFinishedPayment
  }
}
