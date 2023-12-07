import CourseInterface from "../../interfaces/courseInterface"
import QuestionInterface from "../../interfaces/questionInterface"
import { QuestionAnswerInterface } from "../../interfaces/questionAnswerInterface"

type FilterCourseServiceRequest = {
  courseId: string
}

export default class FilterCourseService {
  constructor(
    private courseInterface: CourseInterface,
    private questionInterface: QuestionInterface,
    private questionAnswerInterface: QuestionAnswerInterface
  ) {}

  async exec({ courseId }: FilterCourseServiceRequest) {
    if (!courseId) {
      throw {
        status: 422,
        message: "Id do curso inválido.",
      }
    }

    const doesCourseExists = await this.courseInterface.findById(courseId)

    if (!doesCourseExists) {
      throw {
        status: 404,
        message: "Curso não encontrado.",
      }
    }

    const getCourseQuestions = await this.questionInterface.findAllFromCourse(
      doesCourseExists.id as string
    )

    const getQuestionAnswers =
      await this.questionAnswerInterface.findAllFromQuestion(
        doesCourseExists.id as string
      )

    let courseQuestionsFormatted = []

    for (const question of getCourseQuestions) {
      const doesQuestionHasAnswer = getQuestionAnswers.find(
        (answers) => answers.fkQuestion === question.id
      )

      if (doesQuestionHasAnswer) {
        for (const answer of getQuestionAnswers) {
          if (question.id === answer.fkQuestion) {
            courseQuestionsFormatted.push({
              question: question,
              answers: [answer],
            })
          }
        }
      } else {
        courseQuestionsFormatted.push({
          question: question,
          answers: [],
        })
      }
    }

    return {
      ...doesCourseExists,
      questions: courseQuestionsFormatted,
    }
  }
}
