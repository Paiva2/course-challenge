import { describe, it, expect, beforeEach } from "vitest"
import { ICourse, IQuestion, IQuestionAnswer, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import InsertNewQuestionService from "../../question/insertNewQuestionService"
import InMemoryQuestion from "../../../in-memory/inMemoryQuestion"
import InMemoryQuestionAnswer from "../../../in-memory/inMemoryQuestionAnswer"
import InsertQuestionAnswerService from "../../question_answer/insertQuestionAnswerService"
import FilterCourseService from "../../course/filterCourseService"
import InMemoryPendingPayments from "../../../in-memory/inMemoryPendingPayment"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let fakeProfessor: IUser
let fakeStudent: IUser
let fakeCourse: ICourse
let fakeQuestion: IQuestion
let fakeSecondQuestion: IQuestion
let fakeQuestionAnswer: IQuestionAnswer
let fakeSecondQuestionAnswer: IQuestionAnswer

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet
let inMemoryCourse: InMemoryCourse
let inMemoryQuestion: InMemoryQuestion
let inMemoryQuestionAnswer: InMemoryQuestionAnswer
let inMemoryPendingPayment: InMemoryPendingPayments

let registerNewStudentService: RegisterNewStudentService
let createNewCourseService: CreateNewCourseService
let insertNewQuestionService: InsertNewQuestionService
let insertQuestionAnswerService: InsertQuestionAnswerService

let sut: FilterCourseService

describe("Filter Course Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryQuestion = new InMemoryQuestion()
    inMemoryQuestionAnswer = new InMemoryQuestionAnswer()
    inMemoryPendingPayment = new InMemoryPendingPayments()
    inMemoryWallet = new InMemoryWallet()

    insertNewQuestionService = new InsertNewQuestionService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion
    )

    insertQuestionAnswerService = new InsertQuestionAnswerService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion,
      inMemoryQuestionAnswer,
      inMemoryPendingPayment
    )

    sut = new FilterCourseService(
      inMemoryCourse,
      inMemoryQuestion,
      inMemoryQuestionAnswer
    )

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    createNewCourseService = new CreateNewCourseService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryPendingPayment
    )

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

    fakeQuestion = await insertNewQuestionService.exec({
      courseId: fakeCourse.id as string,
      studentId: fakeStudent.id as string,
      content: "This is an question for test purposes",
    })

    fakeSecondQuestion = await insertNewQuestionService.exec({
      courseId: fakeCourse.id as string,
      studentId: fakeStudent.id as string,
      content: "This is an other question for test purposes",
    })

    fakeQuestionAnswer = await insertQuestionAnswerService.exec({
      content: "Answer to question test",
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      questionId: fakeQuestion.id as string,
    })

    fakeSecondQuestionAnswer = await insertQuestionAnswerService.exec({
      content: "Answer to other question test",
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      questionId: fakeSecondQuestion.id as string,
    })
  })

  it("should get an course based on its id", async () => {
    const getCourse = await sut.exec({
      courseId: fakeCourse.id as string,
    })

    expect(getCourse).toEqual(
      expect.objectContaining({
        id: fakeCourse.id,
        title: fakeCourse.title,
        duration: fakeCourse.duration,
        professor: fakeCourse.professor,
        active: fakeCourse.active,
        description: fakeCourse.description,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        questions: [
          {
            question: expect.objectContaining({
              id: fakeQuestion.id,
              createdAt: expect.any(Date),
              question: fakeQuestion.question,
              fkStudent: fakeStudent.id,
              fkCourse: fakeCourse.id,
            }),

            answers: [
              expect.objectContaining({
                id: fakeQuestionAnswer.id,
                createdAt: expect.any(Date),
                answer: fakeQuestionAnswer.answer,
                fkQuestion: fakeQuestionAnswer.fkQuestion,
                fkProfessor: fakeQuestionAnswer.fkProfessor,
                fkCourse: fakeQuestionAnswer.fkCourse,
              }),
            ],
          },

          {
            question: expect.objectContaining({
              id: fakeSecondQuestion.id,
              createdAt: expect.any(Date),
              question: fakeSecondQuestion.question,
              fkStudent: fakeStudent.id,
              fkCourse: fakeCourse.id,
            }),
            answers: [
              expect.objectContaining({
                id: fakeSecondQuestionAnswer.id,
                createdAt: expect.any(Date),
                answer: fakeSecondQuestionAnswer.answer,
                fkQuestion: fakeSecondQuestionAnswer.fkQuestion,
                fkProfessor: fakeSecondQuestionAnswer.fkProfessor,
                fkCourse: fakeSecondQuestionAnswer.fkCourse,
              }),
            ],
          },
        ],
      })
    )
  })

  it("should not filter an couse by its id without an valid course id", async () => {
    await expect(() => {
      return sut.exec({
        courseId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do curso inválido.",
      })
    )
  })

  it("should not filter an couse by its id if course doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        courseId: "Inexistent course id",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Curso não encontrado.",
      })
    )
  })
})
