import { IFinishedPayments, IPendingPayments } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"
import { PendingPaymentInterface } from "../../interfaces/pendingPaymentInterface"
import FinishedPaymentsInterface from "../../interfaces/finishedPaymentsInterface"

interface IPaymentsView {
  page: number
  totalPages: number
  payments: IPendingPayments[] | IFinishedPayments[]
  totalPayments: number
  type?: string
}

type FetchPaymentsServiceRequest = {
  adminId: string
  paymentType: "pending" | "finished"
  page: number
}

export default class FetchPaymentsService {
  constructor(
    private userInterface: UserInterface,
    private pendingPaymentsInterface: PendingPaymentInterface,
    private finishedPaymentsInterface: FinishedPaymentsInterface
  ) {}

  async exec({ adminId, paymentType, page }: FetchPaymentsServiceRequest) {
    if (page < 1) {
      page = 1
    }

    if (!adminId) {
      throw {
        status: 422,
        message: "Id do administrador inválido.",
      }
    }

    const getAdmin = await this.userInterface.findById(adminId)

    if (!getAdmin) {
      throw {
        status: 404,
        message: "Administrador não encontrado.",
      }
    } else if (getAdmin?.role !== "admin") {
      throw {
        status: 403,
        message: "Permissões insuficientes.",
      }
    }

    let paymentsView = {} as IPaymentsView

    switch (paymentType) {
      case "pending": {
        paymentsView = await this.pendingPaymentsInterface.getAll(page)

        break
      }

      case "finished": {
        paymentsView = await this.finishedPaymentsInterface.getAll(page)

        break
      }

      default:
        null
    }

    return {
      ...paymentsView,
      type: paymentType,
    }
  }
}
