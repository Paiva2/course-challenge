import { describe, it, expect, beforeEach } from "vitest"
import { ICourse, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import InMemoryPendingPayments from "../../../in-memory/inMemoryPendingPayment"
import InMemoryFinishedPayment from "../../../in-memory/inMemoryFinishedPayment"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"
import FinishAPaymentService from "../../finished_payments/finishAPaymentService"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import GetProfessorBalanceService from "../../professor/getProfessorBalanceService"
import InsertNewQuestionService from "../../question/insertNewQuestionService"
import InMemoryQuestion from "../../../in-memory/inMemoryQuestion"
import InMemoryQuestionAnswer from "../../../in-memory/inMemoryQuestionAnswer"
import InsertQuestionAnswerService from "../../question_answer/insertQuestionAnswerService"

let fakeAdmin: IUser
let fakeStudent: IUser
let fakeProfessor: IUser
let fakeCourse: ICourse

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse
let inMemoryPendingPayments: InMemoryPendingPayments
let inMemoryFinishedPayment: InMemoryFinishedPayment
let inMemoryWallet: InMemoryWallet
let inMemoryQuestion: InMemoryQuestion
let inMemoryQuestionAnswer: InMemoryQuestionAnswer

let registerNewStudentService: RegisterNewStudentService
let createNewCourseService: CreateNewCourseService
let finishAPaymentService: FinishAPaymentService
let insertNewQuestionService: InsertNewQuestionService
let insertQuestionAnswerService: InsertQuestionAnswerService

let sut: GetProfessorBalanceService

describe("Get professor balance service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryPendingPayments = new InMemoryPendingPayments()
    inMemoryFinishedPayment = new InMemoryFinishedPayment()
    inMemoryWallet = new InMemoryWallet()
    inMemoryQuestion = new InMemoryQuestion()
    inMemoryQuestionAnswer = new InMemoryQuestionAnswer()

    sut = new GetProfessorBalanceService(
      inMemoryUser,
      inMemoryWallet,
      inMemoryPendingPayments,
      inMemoryFinishedPayment
    )

    insertQuestionAnswerService = new InsertQuestionAnswerService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion,
      inMemoryQuestionAnswer,
      inMemoryPendingPayments
    )

    insertNewQuestionService = new InsertNewQuestionService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion
    )

    finishAPaymentService = new FinishAPaymentService(
      inMemoryUser,
      inMemoryPendingPayments,
      inMemoryFinishedPayment,
      inMemoryWallet
    )

    createNewCourseService = new CreateNewCourseService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryPendingPayments
    )

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    fakeAdmin = await inMemoryUser.create(
      "John Doe Admin",
      "johndoeadmin@email.com",
      "123456",
      "admin"
    )

    fakeProfessor = await registerNewStudentService.exec({
      name: "John Doe Professor",
      password: "123456",
      role: "professor",
      email: "johndoeprofessor@email.com",
    })

    fakeStudent = await registerNewStudentService.exec({
      name: "John Doe Student",
      password: "123456",
      role: "student",
      email: "johndoestudent@email.com",
    })

    fakeCourse = await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course",
        description: "Test description",
        duration: 3600, // 1h,
      },
    })

    const fakeQuestion = await insertNewQuestionService.exec({
      content: "Question test",
      courseId: fakeCourse.id as string,
      studentId: fakeStudent.id as string,
    })

    await insertQuestionAnswerService.exec({
      content: "Answer test",
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      questionId: fakeQuestion.id as string,
    })
  })

  it("should get professor balance", async () => {
    const getAllPendings = await inMemoryPendingPayments.getAll()

    await finishAPaymentService.exec({
      adminId: fakeAdmin.id as string,
      pendingPaymentId: getAllPendings[0].id as string,
      professorId: fakeProfessor.id as string,
    })

    const getBalanceOne = await sut.exec({
      professorId: fakeProfessor.id as string,
    })

    expect(getBalanceOne).toEqual(
      expect.objectContaining({
        walletTotal: 300,
        pendingTotal: 15,
        receivedTotal: 300,
      })
    )

    await finishAPaymentService.exec({
      adminId: fakeAdmin.id as string,
      pendingPaymentId: getAllPendings[0].id as string,
      professorId: fakeProfessor.id as string,
    })

    const getBalanceTwo = await sut.exec({
      professorId: fakeProfessor.id as string,
    })

    expect(getBalanceTwo).toEqual(
      expect.objectContaining({
        walletTotal: 315,
        pendingTotal: 0,
        receivedTotal: 315,
      })
    )
  })

  it("should not get professor balance without an provided id on request", async () => {
    await expect(() => {
      return sut.exec({
        professorId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do professor inválido.",
      })
    )
  })

  it("should not get professor balance if user doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        professorId: "Inexistent professor id",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Professor não encontrado.",
      })
    )
  })

  it("should not get professor balance if user insn't an professor", async () => {
    await expect(() => {
      return sut.exec({
        professorId: fakeStudent.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Apenas professores podem ter pagamento.",
      })
    )
  })
})
