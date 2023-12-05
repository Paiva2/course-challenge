import { describe, it, expect, beforeEach } from "vitest"
import { IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import GetActiveCoursesService from "../../course/getActiveCoursesService"

let fakeProfessor: IUser

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse

let registerNewStudentService: RegisterNewStudentService

let createNewCourseService: CreateNewCourseService

let sut: GetActiveCoursesService

describe("Get Active Courses Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()

    registerNewStudentService = new RegisterNewStudentService(inMemoryUser)

    createNewCourseService = new CreateNewCourseService(inMemoryUser, inMemoryCourse)

    fakeProfessor = await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "professor",
    })

    sut = new GetActiveCoursesService(inMemoryCourse)
  })

  it("should get active courses", async () => {
    await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course",
        description: "Test description",
        duration: 3600, // 1h,
      },
    })

    await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course 2",
        description: "Test description 2",
        duration: 14400, // 4h,
      },
    })

    const inativeCourse = await createNewCourseService.exec({
      professorId: fakeProfessor.id as string,
      course: {
        title: "Test course 3",
        description: "Test description 3",
        duration: 3600, // 1h,
      },
    })

    await inMemoryCourse.updateFull({
      ...inativeCourse,
      active: false,
    })

    const courses = await sut.exec({ page: 1 })

    expect(courses).toEqual({
      page: 1,
      totalPages: 1,
      courses: [
        expect.objectContaining({
          id: expect.any(String),
          title: "Test course",
          duration: 3600,
          professor: fakeProfessor.id as string,
          active: true,
          description: "Test description",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),

        expect.objectContaining({
          id: expect.any(String),
          title: "Test course 2",
          duration: 14400,
          professor: fakeProfessor.id as string,
          active: true,
          description: "Test description 2",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ],
    })
  })

  it("should get active courses by page parameters", async () => {
    for (let i = 1; i <= 23; i++) {
      await createNewCourseService.exec({
        professorId: fakeProfessor.id as string,
        course: {
          title: `Test course ${i}`,
          description: `Test description ${i}`,
          duration: 3600, // 1h,
        },
      })
    }

    const courses = await sut.exec({ page: 3 })

    expect(courses).toEqual({
      page: 3,
      totalPages: 3,
      courses: [
        expect.objectContaining({
          id: expect.any(String),
          title: "Test course 21",
          duration: 3600,
          professor: fakeProfessor.id as string,
          active: true,
          description: "Test description 21",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),

        expect.objectContaining({
          id: expect.any(String),
          title: "Test course 22",
          duration: 3600,
          professor: fakeProfessor.id as string,
          active: true,
          description: "Test description 22",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),

        expect.objectContaining({
          id: expect.any(String),
          title: "Test course 23",
          duration: 3600,
          professor: fakeProfessor.id as string,
          active: true,
          description: "Test description 23",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ],
    })
  })
})
