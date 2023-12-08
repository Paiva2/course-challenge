import { IQuestionAnswer } from "../../@types/types"
import { QuestionAnswerInterface } from "../../interfaces/questionAnswerInterface"
import { UserInterface } from "../../interfaces/userInterface"
import CourseInterface from "../../interfaces/courseInterface"
import QuestionInterface from "../../interfaces/questionInterface"

type InsertQuestionAnswerServiceRequest = {
  professorId: string
  courseId: string
  questionId: string
  content: string
}

type InsertQuestionAnswerServiceResponde = IQuestionAnswer

export default class InsertQuestionAnswerService {
  constructor(
    private userInterface: UserInterface,
    private courseInterface: CourseInterface,
    private questionInterface: QuestionInterface,
    private questionAnswerInterface: QuestionAnswerInterface
  ) {}

  async exec({
    content,
    courseId,
    professorId,
    questionId,
  }: InsertQuestionAnswerServiceRequest): Promise<InsertQuestionAnswerServiceResponde> {
    if (!courseId) {
      throw {
        status: 422,
        message: "Id do curso inválido.",
      }
    } else if (!professorId) {
      throw {
        status: 422,
        message: "Id do professor inválido.",
      }
    } else if (!questionId) {
      throw {
        status: 422,
        message: "Id da questão inválido.",
      }
    } else if (!content) {
      throw {
        status: 422,
        message: "A resposta da questão não pode ser vazia.",
      }
    }

    const doesProfessorExists = await this.userInterface.findById(professorId)

    if (!doesProfessorExists) {
      throw {
        status: 404,
        message: "Professor não encontrado.",
      }
    }

    const doesProfessorHasPermissions =
      doesProfessorExists.role === "professor" ||
      doesProfessorExists.role === "admin"

    if (!doesProfessorHasPermissions) {
      throw {
        status: 403,
        message:
          "Permissões insuficientes. Você precisa ser um professor para responder questões do curso.",
      }
    }

    const doesCourseExists = await this.courseInterface.findById(courseId)

    if (!doesCourseExists) {
      throw {
        status: 404,
        message: "Curso não encontrado.",
      }
    }

    const getQuestion = await this.questionInterface.findById(questionId)

    if (!getQuestion) {
      throw {
        status: 404,
        message: "Questão não encontrada.",
      }
    }

    const doesProfessorOwnsThisCourse = doesCourseExists.professor === professorId

    if (!doesProfessorOwnsThisCourse) {
      throw {
        status: 403,
        message:
          "Permissões insuficientes. Você precisa ser dono do curso para responder questões do curso.",
      }
    }

    const doesProfessorAlreadyAnsweredThisQuestion =
      await this.questionAnswerInterface.find(professorId, questionId)

    if (doesProfessorAlreadyAnsweredThisQuestion) {
      throw {
        status: 409,
        message: "Essa questão já foi respondida.",
      }
    }

    const createNewAnswer = await this.questionAnswerInterface.create(
      courseId,
      professorId,
      questionId,
      content,
      doesProfessorExists.name
    )

    return createNewAnswer
  }
}
