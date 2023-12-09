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

let fakeAdmin: IUser
let fakeProfessor: IUser
let fakeCourse: ICourse

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse
let inMemoryPendingPayments: InMemoryPendingPayments
let inMemoryFinishedPayment: InMemoryFinishedPayment
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService

let createNewCourseService: CreateNewCourseService

let sut: FinishAPaymentService

describe("Finish an pending payment service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryPendingPayments = new InMemoryPendingPayments()
    inMemoryFinishedPayment = new InMemoryFinishedPayment()
    inMemoryWallet = new InMemoryWallet()

    sut = new FinishAPaymentService(
      inMemoryUser,
      inMemoryPendingPayments,
      inMemoryFinishedPayment,
      inMemoryWallet
    )

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    createNewCourseService = new CreateNewCourseService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryPendingPayments
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
      email: "johndoe@email.com",
    })

    fakeCourse = await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course",
        description: "Test description",
        duration: 3600, // 1h,
      },
    })
  })

  it("should finish an pending payment and insert to professor wallet", async () => {
    const getAllPendings = await inMemoryPendingPayments.getAll()

    const pendingPaymentVal = getAllPendings[0].value

    await sut.exec({
      adminId: fakeAdmin.id as string,
      pendingPaymentId: getAllPendings[0].id,
      professorId: fakeProfessor.id as string,
    })

    const getAllPendingsAfterFinishOne = await inMemoryPendingPayments.getAll()

    const getWallet = await inMemoryWallet.getByUserId(fakeProfessor.id as string)

    expect(getWallet).toEqual(
      expect.objectContaining({
        total: pendingPaymentVal,
      })
    )
    expect(getAllPendingsAfterFinishOne.length).toBe(0)
  })

  it("should not finish an pending payment without correctly request args", async () => {
    await expect(() => {
      return sut.exec({
        adminId: fakeAdmin.id as string,
        pendingPaymentId: "Any payment id",
        professorId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({ message: "Id do professor inválido." })
    )

    await expect(() => {
      return sut.exec({
        adminId: "",
        pendingPaymentId: "Any payment id",
        professorId: fakeProfessor.id as string,
      })
    }).rejects.toEqual(expect.objectContaining({ message: "Id do admin inválido." }))

    await expect(() => {
      return sut.exec({
        adminId: fakeAdmin.id as string,
        pendingPaymentId: "",
        professorId: fakeProfessor.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({ message: "Id do pagamento pendente inválido." })
    )
  })
})
