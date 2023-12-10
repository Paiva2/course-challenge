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

  async getAllFromProfessor(professorId: string): Promise<IFinishedPayments[]> {
    return this.finishedPayments.filter(
      (payments) => payments.fkProfessor === professorId
    )
  }

  async getAll(page: number) {
    const perPage = 10

    const getFinishedPayments = this.finishedPayments

    const totalPages = Math.ceil(getFinishedPayments.length / perPage)

    return {
      totalPages,
      page,
      totalPayments: getFinishedPayments.length,
      payments: getFinishedPayments.slice((page - 1) * perPage, page * perPage),
    }
  }
}
