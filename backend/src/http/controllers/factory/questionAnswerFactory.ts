import CourseModel from "../../database/prisma/model/courseModel"
import QuestionAnswerModel from "../../database/prisma/model/questionAnswerModel"
import QuestionModel from "../../database/prisma/model/questionModel"
import UserModel from "../../database/prisma/model/userModel"
import InsertQuestionAnswerService from "../../services/question_answer/insertQuestionAnswerService"

export default class QuestionAnswerFactory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()
    const questionModel = new QuestionModel()
    const questionAnswerModel = new QuestionAnswerModel()

    const insertQuestionAnswerService = new InsertQuestionAnswerService(
      userModel,
      courseModel,
      questionModel,
      questionAnswerModel
    )

    return {
      insertQuestionAnswerService,
    }
  }
}
