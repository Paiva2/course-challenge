import { describe, it, expect, beforeEach } from "vitest"
import { ICourseCreation, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import InMemoryPendingPayments from "../../../in-memory/inMemoryPendingPayment"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let fakeProfessor: IUser

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet
let inMemoryCourse: InMemoryCourse
let inMemoryPendingPayments: InMemoryPendingPayments

let registerNewStudentService: RegisterNewStudentService

let sut: CreateNewCourseService

describe("Create new course service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryPendingPayments = new InMemoryPendingPayments()
    inMemoryWallet = new InMemoryWallet()

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    sut = new CreateNewCourseService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryPendingPayments
    )

    fakeProfessor = await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "professor",
    })
  })

  it("should create a new course", async () => {
    const newCourse = await sut.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course",
        description: "Test description",
        duration: 3600, // 1h,
      },
    })

    const checkIfPendingPaymentIsCreated =
      await inMemoryPendingPayments.findFirstByUserId(fakeProfessor.id)

    expect(checkIfPendingPaymentIsCreated).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        value: 300,
        reason: "course",
        fkProfessor: fakeProfessor.id,
      })
    )

    expect(newCourse).toEqual(
      expect.objectContaining({
        id: newCourse.id,
        title: "Test course",
        duration: 3600,
        professor: newCourse.professor,
        active: true,
        description: "Test description",
        createdAt: newCourse.createdAt,
        updatedAt: newCourse.updatedAt,
      })
    )
  })

  it("should not create a new course if user id are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        professorId: "",
        course: {
          title: "Test course",
          description: "Test description",
          duration: 3600, // 1h,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do usuário inválido.",
      })
    )
  })

  it("should not create a new course if course are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        professorId: "any professor id",
        course: {} as ICourseCreation,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Informações do curso inválidas.",
      })
    )
  })

  it("should not create a new course if professor doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        professorId: "Inexistent Professor id",
        course: {
          title: "Test course",
          description: "Test description",
          duration: 3600, // 1h,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Professor não encontrado nos registros.",
      })
    )
  })

  it("should not create a new course if user has no admin or professor permissions", async () => {
    const unauthStudent = await registerNewStudentService.exec({
      name: "John Doe Student",
      password: "123456",
    })

    await expect(() => {
      return sut.exec({
        professorId: unauthStudent.id as string,
        course: {
          title: "Test course",
          description: "Test description",
          duration: 3600, // 1h,
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Apenas um professor ou administrador pode registrar novos cursos.",
      })
    )
  })
})
