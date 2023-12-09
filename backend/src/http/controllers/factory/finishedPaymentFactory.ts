import FinishedPaymentsModel from "../../database/prisma/model/finishedPayments"
import PendingPaymentModel from "../../database/prisma/model/pendingPaymentModel"
import UserModel from "../../database/prisma/model/userModel"
import WalletModel from "../../database/prisma/model/walletModel"
import FinishAPaymentService from "../../services/finished_payments/finishAPaymentService"

export default class FinishedPaymentFactory {
  public static async exec() {
    const userModel = new UserModel()
    const walletModal = new WalletModel()
    const finishedPaymentsModel = new FinishedPaymentsModel()
    const pendingPaymentModel = new PendingPaymentModel()

    const finishAPaymentService = new FinishAPaymentService(
      userModel,
      pendingPaymentModel,
      finishedPaymentsModel,
      walletModal
    )

    return {
      finishAPaymentService,
    }
  }
}
