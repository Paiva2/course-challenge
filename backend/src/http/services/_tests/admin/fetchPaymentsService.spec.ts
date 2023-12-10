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
import FetchPaymentsService from "../../admin/fetchPaymentsService"

let fakeAdmin: IUser
let fakeProfessor: IUser
let fakeCourse: ICourse

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse
let inMemoryPendingPayments: InMemoryPendingPayments
let inMemoryFinishedPayment: InMemoryFinishedPayment
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService
let finishAPaymentService: FinishAPaymentService
let createNewCourseService: CreateNewCourseService

let sut: FetchPaymentsService

describe("Fetch payments service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryPendingPayments = new InMemoryPendingPayments()
    inMemoryFinishedPayment = new InMemoryFinishedPayment()
    inMemoryWallet = new InMemoryWallet()

    sut = new FetchPaymentsService(
      inMemoryUser,
      inMemoryPendingPayments,
      inMemoryFinishedPayment
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

    finishAPaymentService = new FinishAPaymentService(
      inMemoryUser,
      inMemoryPendingPayments,
      inMemoryFinishedPayment,
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
      email: "johndoe@email.com",
    })
  })

  it("should list all pending payments", async () => {
    for (let i = 1; i <= 23; i++) {
      fakeCourse = await createNewCourseService.exec({
        professorId: fakeProfessor.id as string,
        course: {
          title: `Course number ${i}`,
          description: `Description for course number ${i}`,
          duration: 3600, // 1h,
        },
      })
    }

    const pendingList = await sut.exec({
      adminId: fakeAdmin.id as string,
      page: 3,
      paymentType: "pending",
    })

    expect(pendingList).toEqual(
      expect.objectContaining({
        page: 3,
        totalPages: 3,
        totalPayments: 23,
        type: "pending",
        payments: [
          expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(Date),
            value: 300,
            reason: "course",
            fkProfessor: fakeProfessor.id,
          }),

          expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(Date),
            value: 300,
            reason: "course",
            fkProfessor: fakeProfessor.id,
          }),

          expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(Date),
            value: 300,
            reason: "course",
            fkProfessor: fakeProfessor.id,
          }),
        ],
      })
    )
  })

  it("should list all finished payments", async () => {
    await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: `Course number1`,
        description: `Description for course number 1`,
        duration: 3600, // 1h,
      },
    })

    await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: `Course number 2`,
        description: `Description for course number 2`,
        duration: 3600, // 1h,
      },
    })

    await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: `Course number 3`,
        description: `Description for course number 3`,
        duration: 3600, // 1h,
      },
    })

    const pendingList = await sut.exec({
      adminId: fakeAdmin.id as string,
      page: 1,
      paymentType: "pending",
    })

    const finishedPaymentOne = await finishAPaymentService.exec({
      adminId: fakeAdmin.id as string,
      pendingPaymentId: pendingList.payments[0].id as string,
      professorId: fakeProfessor.id as string,
    })

    const finishedPaymentTwo = await finishAPaymentService.exec({
      adminId: fakeAdmin.id as string,
      pendingPaymentId: pendingList.payments[1].id as string,
      professorId: fakeProfessor.id as string,
    })

    const finishedList = await sut.exec({
      adminId: fakeAdmin.id as string,
      page: 1,
      paymentType: "finished",
    })

    expect(finishedList).toEqual(
      expect.objectContaining({
        page: 1,
        totalPages: 1,
        totalPayments: 2,
        type: "finished",
        payments: [
          expect.objectContaining({
            id: finishedPaymentOne.id,
            createdAt: expect.any(Date),
            value: 300,
            reason: "course",
            fkProfessor: fakeProfessor.id,
          }),

          expect.objectContaining({
            id: finishedPaymentTwo.id,
            createdAt: expect.any(Date),
            value: 300,
            reason: "course",
            fkProfessor: fakeProfessor.id,
          }),
        ],
      })
    )
  })

  it("should not list all payments without an admin id", async () => {
    await expect(() => {
      return sut.exec({
        adminId: "",
        page: 1,
        paymentType: "pending",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do administrador inválido.",
      })
    )
  })

  it("should not list all payments if admin id doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        adminId: "Inexistent id",
        page: 1,
        paymentType: "pending",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Administrador não encontrado.",
      })
    )
  })

  it("should not list all payments if provided id isn't from an admin", async () => {
    await expect(() => {
      return sut.exec({
        adminId: fakeProfessor.id as string,
        page: 1,
        paymentType: "pending",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Permissões insuficientes.",
      })
    )
  })
})
