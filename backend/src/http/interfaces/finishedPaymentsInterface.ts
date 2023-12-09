import { IFinishedPayments } from "../@types/types"

export default interface FinishedPaymentsInterface {
  create(
    professorId: string,
    value: number,
    reason: string
  ): Promise<IFinishedPayments>
}
