import FinishedPaymentsModel from "../../database/prisma/model/finishedPayments"
import PendingPaymentModel from "../../database/prisma/model/pendingPaymentModel"
import UserModel from "../../database/prisma/model/userModel"
import FetchPaymentsService from "../../services/admin/fetchPaymentsService"

export default class AdminFactory {
  public static async exec() {
    const userModel = new UserModel()
    const pendingPaymentModel = new PendingPaymentModel()
    const finishedPaymentsModel = new FinishedPaymentsModel()

    const fetchPaymentsService = new FetchPaymentsService(
      userModel,
      pendingPaymentModel,
      finishedPaymentsModel
    )

    return {
      fetchPaymentsService,
    }
  }
}
