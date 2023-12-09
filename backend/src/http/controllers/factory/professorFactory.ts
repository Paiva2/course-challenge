import FinishedPaymentsModel from "../../database/prisma/model/finishedPayments"
import PendingPaymentModel from "../../database/prisma/model/pendingPaymentModel"
import UserModel from "../../database/prisma/model/userModel"
import WalletModel from "../../database/prisma/model/walletModel"
import GetProfessorBalanceService from "../../services/professor/getProfessorBalanceService"

export default class ProfessorFactory {
  public static async exec() {
    const userModel = new UserModel()
    const walletModel = new WalletModel()
    const pendingPaymentModel = new PendingPaymentModel()
    const finishedPaymentModel = new FinishedPaymentsModel()

    const getProfessorBalanceService = new GetProfessorBalanceService(
      userModel,
      walletModel,
      pendingPaymentModel,
      finishedPaymentModel
    )

    return {
      getProfessorBalanceService,
    }
  }
}
