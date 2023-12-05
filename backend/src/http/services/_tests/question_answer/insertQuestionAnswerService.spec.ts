import { describe, it, expect, beforeEach } from "vitest"
import { ICourse, IQuestion, IUser } from "../../../@types/types"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import CreateNewCourseService from "../../course/createNewCourseService"
import InMemoryCourse from "../../../in-memory/inMemoryCourse"
import InsertNewQuestionService from "../../question/insertNewQuestionService"
import InMemoryQuestion from "../../../in-memory/inMemoryQuestion"
import InMemoryQuestionAnswer from "../../../in-memory/inMemoryQuestionAnswer"
import InsertQuestionAnswerService from "../../question_answer/insertQuestionAnswerService"

let fakeProfessor: IUser
let fakeStudent: IUser
let fakeCourse: ICourse
let fakeQuestion: IQuestion

let inMemoryUser: InMemoryUser
let inMemoryCourse: InMemoryCourse
let inMemoryQuestion: InMemoryQuestion
let inMemoryQuestionAnswer: InMemoryQuestionAnswer

let registerNewStudentService: RegisterNewStudentService
let createNewCourseService: CreateNewCourseService
let insertNewQuestionService: InsertNewQuestionService

let sut: InsertQuestionAnswerService

describe("Insert new question answer service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryCourse = new InMemoryCourse()
    inMemoryQuestion = new InMemoryQuestion()
    inMemoryQuestionAnswer = new InMemoryQuestionAnswer()

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

    insertNewQuestionService = new InsertNewQuestionService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion
    )

    sut = new InsertQuestionAnswerService(
      inMemoryUser,
      inMemoryCourse,
      inMemoryQuestion,
      inMemoryQuestionAnswer
    )

    fakeQuestion = await insertNewQuestionService.exec({
      courseId: fakeCourse.id as string,
      studentId: fakeStudent.id as string,
      content: "This is an question for test purposes",
    })
  })

  it("should insert a new answer to an existing question", async () => {
    const newAnswer = await sut.exec({
      content: "Answer to question test",
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      questionId: fakeQuestion.id as string,
    })

    expect(newAnswer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        answer: "Answer to question test",
        fkQuestion: fakeQuestion.id,
        fkProfessor: fakeProfessor.id,
      })
    )
  })

  it("should not insert a new answer to an question without an provided course id", async () => {
    await expect(() => {
      return sut.exec({
        content: "Answer to question test",
        courseId: "",
        professorId: fakeProfessor.id as string,
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do curso inválido.",
      })
    )
  })

  it("should not insert a new answer to an question without an provided professor id", async () => {
    await expect(() => {
      return sut.exec({
        content: "Answer to question test",
        courseId: fakeCourse.id as string,
        professorId: "",
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do professor inválido.",
      })
    )
  })

  it("should not insert a new answer to an question without an provided question id", async () => {
    await expect(() => {
      return sut.exec({
        content: "Answer to question test",
        courseId: fakeCourse.id as string,
        professorId: fakeProfessor.id as string,
        questionId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id da questão inválido.",
      })
    )
  })

  it("should not insert a new answer to an question without an provided content", async () => {
    await expect(() => {
      return sut.exec({
        content: "",
        courseId: fakeCourse.id as string,
        professorId: fakeProfessor.id as string,
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "A resposta da questão não pode ser vazia.",
      })
    )
  })

  it("should not insert a new answer to an question if professor doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        content: "Any answer",
        courseId: fakeCourse.id as string,
        professorId: "Inexistent professor id",
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Professor não encontrado.",
      })
    )
  })

  it("should not insert a new answer to an question if provided if are not from an professor", async () => {
    await expect(() => {
      return sut.exec({
        content: "Any answer",
        courseId: fakeCourse.id as string,
        professorId: fakeStudent.id as string,
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message:
          "Permissões insuficientes. Você precisa ser um professor para responder questões do curso.",
      })
    )
  })

  it("should not insert a new answer to an question if provided if professor doesn't owns this course", async () => {
    const otherProfessor = await registerNewStudentService.exec({
      name: "John Doe Professor 2",
      password: "123456",
      role: "professor",
    })

    await expect(() => {
      return sut.exec({
        content: "Any answer",
        courseId: fakeCourse.id as string,
        professorId: otherProfessor.id as string,
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message:
          "Permissões insuficientes. Você precisa ser dono do curso para responder questões do curso.",
      })
    )
  })

  it("should not insert a new answer to an question if provided if question doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        content: "Any answer",
        courseId: fakeCourse.id as string,
        professorId: fakeProfessor.id as string,
        questionId: "Inexistent question id",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Questão não encontrada.",
      })
    )
  })

  it("should not insert a new answer to an question if provided if question is already answered", async () => {
    await sut.exec({
      content: "First answer",
      courseId: fakeCourse.id as string,
      professorId: fakeProfessor.id as string,
      questionId: fakeQuestion.id as string,
    })

    await expect(() => {
      return sut.exec({
        content: "Answer again",
        courseId: fakeCourse.id as string,
        professorId: fakeProfessor.id as string,
        questionId: fakeQuestion.id as string,
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Essa questão já foi respondida.",
      })
    )
  })
})