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
      if (getQuestionAnswers.length) {
        for (const answer of getQuestionAnswers) {
          if (question.id === answer.fkQuestion) {
            const doesQuestionHasOtherAnswers = courseQuestionsFormatted.find(
              (quest) => quest.question.id === question.id
            )

            if (doesQuestionHasOtherAnswers?.answers.length) {
              doesQuestionHasOtherAnswers.answers.push(answer)
            } else {
              courseQuestionsFormatted.push({
                question: question,
                answers: [answer],
              })
            }
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
