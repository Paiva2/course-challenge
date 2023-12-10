import { PendingPaymentInterface } from "../../interfaces/pendingPaymentInterface"
import { UserInterface } from "../../interfaces/userInterface"
import { IFinishedPayments, IPendingPayments } from "../../@types/types"
import FinishedPaymentsInterface from "../../interfaces/finishedPaymentsInterface"
import WalletInterface from "../../interfaces/walletInterface"

type GetProfessorBalanceServiceRequest = {
  professorId: string
}

export default class GetProfessorBalanceService {
  constructor(
    private userInterface: UserInterface,
    private walletInterface: WalletInterface,
    private pendingPaymentInterface: PendingPaymentInterface,
    private finishedPaymentsInterface: FinishedPaymentsInterface
  ) {}

  async exec({ professorId }: GetProfessorBalanceServiceRequest) {
    if (!professorId) {
      throw {
        status: 422,
        message: "Id do professor inválido.",
      }
    }

    const getProfessor = await this.userInterface.findById(professorId)

    if (!getProfessor) {
      throw {
        status: 404,
        message: "Professor não encontrado.",
      }
    } else if (getProfessor.role !== "professor") {
      throw {
        status: 403,
        message: "Apenas professores podem ter pagamento.",
      }
    }

    const getWallet = await this.walletInterface.getByUserId(
      getProfessor.id as string
    )

    const getPendings = await this.pendingPaymentInterface.getAllFromProfessor(
      getProfessor.id as string
    )

    const getFinished = await this.finishedPaymentsInterface.getAllFromProfessor(
      getProfessor.id as string
    )

    let pendingTotal = 0
    let receivedTotal = 0

    pendingTotal = this.getSums(getPendings)

    receivedTotal = this.getSums(getFinished)

    const formatBalanceView = {
      walletTotal: getWallet.total,
      pendingTotal,
      receivedTotal,
    }

    return formatBalanceView
  }

  private getSums(values: IPendingPayments[] | IFinishedPayments[]) {
    return values.reduce((acc, pending) => {
      let formatValue = Number(pending.value)

      return +(formatValue += acc).toFixed(2)
    }, 0)
  }
}
