import { describe, it, expect, beforeEach } from "vitest"
import { ICourse, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import UpdateCourseInformationsService from "../../course/updateCourseInformationsService"

let fakeProfessor: IUser
let fakeCourse: ICourse

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse

let registerNewStudentService: RegisterNewStudentService

let createNewCourseService: CreateNewCourseService

let sut: UpdateCourseInformationsService

describe("Update course informations service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()

    registerNewStudentService = new RegisterNewStudentService(inMemoryUser)

    createNewCourseService = new CreateNewCourseService(inMemoryUser, inMemoryCourse)

    sut = new UpdateCourseInformationsService(inMemoryUser, inMemoryCourse)

    fakeProfessor = await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "professor",
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

  it("should update course informations", async () => {
    const updateCourse = await sut.exec({
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      fieldsToUpdate: {
        title: "Update title",
        description: "Update description",
      },
    })

    expect(updateCourse).toEqual(
      expect.objectContaining({
        ...fakeCourse,
        title: "Update title",
        description: "Update description",
      })
    )
  })

  it("should return current informations if none field are provided to update", async () => {
    const updateCourse = await sut.exec({
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      fieldsToUpdate: {},
    })

    expect(updateCourse).toEqual(fakeCourse)
  })

  it("should not update course informations without an provided professor id", async () => {
    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        professorId: "",
        fieldsToUpdate: {
          title: "Update title",
          description: "Update description",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do professor inválido.",
      })
    )
  })

  it("should not update course informations if professor doesn't exists on registers", async () => {
    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        professorId: "Inexistent Professor Id",
        fieldsToUpdate: {
          title: "Update title",
          description: "Update description",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Professor não encontrado.",
      })
    )
  })

  it("should not update course informations if course doesn't exists on registers", async () => {
    await expect(() => {
      return sut.exec({
        courseId: "Inexistent course Id",
        professorId: fakeProfessor.id as string,
        fieldsToUpdate: {
          title: "Update title",
          description: "Update description",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Curso não encontrado.",
      })
    )
  })

  it("should not update course informations if course doesn't belongs to that professor", async () => {
    const otherProfessor = await registerNewStudentService.exec({
      name: "John Doe 2",
      password: "123456",
      role: "professor",
    })

    await expect(() => {
      return sut.exec({
        courseId: fakeCourse.id as string,
        professorId: otherProfessor.id as string,
        fieldsToUpdate: {
          title: "Update title",
          description: "Update description",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Permissões insuficientes.",
      })
    )
  })
})
