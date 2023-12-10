import { IFinishedPayments } from "../@types/types"

export default interface FinishedPaymentsInterface {
  create(
    professorId: string,
    value: number,
    reason: string
  ): Promise<IFinishedPayments>

  getAllFromProfessor(professorId: string): Promise<IFinishedPayments[]>

  getAll(page: number): Promise<{
    page: number
    totalPages: number
    payments: IFinishedPayments[]
    totalPayments: number
  }>
}
