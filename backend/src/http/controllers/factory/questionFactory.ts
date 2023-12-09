import CourseModel from "../../database/prisma/model/courseModel"
import QuestionModel from "../../database/prisma/model/questionModel"
import UserModel from "../../database/prisma/model/userModel"
import InsertNewQuestionService from "../../services/question/insertNewQuestionService"

export default class QuestionFactory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()
    const questionModel = new QuestionModel()

    const insertNewQuestionService = new InsertNewQuestionService(
      userModel,
      courseModel,
      questionModel
    )

    return {
      insertNewQuestionService,
    }
  }
}
