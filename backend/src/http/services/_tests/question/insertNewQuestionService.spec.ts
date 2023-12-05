import { describe, it, expect, beforeEach } from "vitest"
import { ICourse, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import InsertNewQuestionService from "../../question/insertNewQuestionService"
import InMemoryQuestion from "../../../in-memory/inMemoryQuestion"

let fakeProfessor: IUser
let fakeStudent: IUser
let fakeCourse: ICourse

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse
let inMemoryQuestion: InMemoryQuestion

let registerNewStudentService: RegisterNewStudentService

let createNewCourseService: CreateNewCourseService

let sut: InsertNewQuestionService

describe("Insert new question service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryQuestion = new InMemoryQuestion()

    registerNewStudentService = new RegisterNewStudentService(inMemoryUser)

    createNewCourseService = new CreateNewCourseService(inMemoryUser, inMemoryCourse)

    fakeProfessor = await registerNewStudentService.exec({
      name: "John Doe Professor",
      password: "123456",
      role: "professor",
    })

    fakeStudent = await registerNewStudentService.exec({
      name: "John Doe Student",
      password: "123456",
      role: "student",
    })

    fakeCourse = await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course",
        description: "Test description",
        duration: 3600, // 1h,
      },
    })

    sut = new InsertNewQuestionService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion
    )
  })

  it("should insert a new question to an existing course", async () => {
    const newQuestion = await sut.exec({
      courseId: fakeCourse.id as string,
      studentId: fakeStudent.id as string,
      content: "This is an question for test purposes",
    })

    expect(newQuestion).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        question: "This is an question for test purposes",
        fkStudent: fakeStudent.id,
        fkCourse: fakeCourse.id,
      })
    )
  })

  it("should not insert a new question to an existing course if course id are not provided", async () => {
    await expect(() => {
      return sut.exec({
        courseId: "",
        studentId: fakeStudent.id as string,
        content: "This is an question for test purposes",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do curso inválido.",
      })
    )
  })

  it("should not insert a new question to an existing course if student id are not provided", async () => {
    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        studentId: "",
        content: "This is an question for test purposes",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do estudante inválido.",
      })
    )
  })

  it("should not insert a new question to an existing course if question content are not provided", async () => {
    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        studentId: fakeStudent.id as string,
        content: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "A questão não pode ser vazia.",
      })
    )
  })

  it("should not insert a new question to an existing course if student isn't registered", async () => {
    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        studentId: "Inexistent student id",
        content: "This is an question for test purposes",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Estudante não encontrado.",
      })
    )
  })

  it("should not insert a new question to an existing course if course isn't registered", async () => {
    await expect(() => {
      return sut.exec({
        courseId: "Inexistent course id",
        studentId: fakeStudent.id as string,
        content: "This is an question for test purposes",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Curso não encontrado.",
      })
    )
  })
})
