import FinishedPaymentsInterface from "../../interfaces/finishedPaymentsInterface"
import WalletInterface from "../../interfaces/walletInterface"
import { PendingPaymentInterface } from "../../interfaces/pendingPaymentInterface"
import { UserInterface } from "../../interfaces/userInterface"
import { transporter } from "../../lib/nodemailer"

type FinishAPaymentServiceRequest = {
  adminId: string
  professorId: string
  pendingPaymentId: string
}

export default class FinishAPaymentService {
  constructor(
    private userInteface: UserInterface,
    private pendingPaymentInterface: PendingPaymentInterface,
    private finishedPayments: FinishedPaymentsInterface,
    private walletInterface: WalletInterface
  ) {}

  async exec({
    pendingPaymentId,
    professorId,
    adminId,
  }: FinishAPaymentServiceRequest) {
    if (!professorId) {
      throw {
        status: 422,
        message: "Id do professor inválido.",
      }
    } else if (!adminId) {
      throw {
        status: 422,
        message: "Id do admin inválido.",
      }
    } else if (!pendingPaymentId) {
      throw {
        status: 422,
        message: "Id do pagamento pendente inválido.",
      }
    }

    const isRequestMadeByAnAdmin = await this.userInteface.findById(adminId)

    if (isRequestMadeByAnAdmin?.role !== "admin") {
      throw {
        status: 403,
        message: "Permissões insuficientes.",
      }
    }

    const isReceiverAnProfessor = await this.userInteface.findById(professorId)

    if (!isReceiverAnProfessor || isReceiverAnProfessor.role !== "professor") {
      throw {
        status: 403,
        message: "Apenas professores podem receber pagamentos.",
      }
    }

    const getPendingPayment = await this.pendingPaymentInterface.findById(
      professorId,
      pendingPaymentId
    )

    if (!getPendingPayment) {
      throw {
        status: 404,
        message: "Pagamento pendente não encontrado.",
      }
    }

    await this.pendingPaymentInterface.removePending(professorId, pendingPaymentId)

    await this.walletInterface.insert(professorId, getPendingPayment.value)

    const finishPayment = await this.finishedPayments.create(
      professorId,
      getPendingPayment.value,
      getPendingPayment.reason
    )

    if (process.env.NODE_ENV !== "test") {
      await this.emailTrigger(
        isReceiverAnProfessor.email,
        getPendingPayment.reason,
        getPendingPayment.value
      )
    }

    return finishPayment
  }

  async emailTrigger(email: string, reason: string, value: number) {
    const determinePaymentReason =
      reason === "course"
        ? "Criar um novo curso"
        : "Responder a questão de um estudante"

    const formatPaymentValueForView = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)

    const mailToBeSent = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "New payment!",
      text: `Você recebeu um novo pagamento por ${determinePaymentReason}!\n Valor do pagamento: ${formatPaymentValueForView}. Obrigado pelo suporte!`,
    }

    try {
      await transporter.sendMail(mailToBeSent)
    } catch (err) {
      console.log(`Error while sending email to: ${email}`, err)
    }
  }
}
