import CourseModel from "../../database/prisma/model/courseModel"
import QuestionAnswerModel from "../../database/prisma/model/questionAnswerModel"
import QuestionModel from "../../database/prisma/model/questionModel"
import UserModel from "../../database/prisma/model/userModel"
import CreateNewCourseService from "../../services/course/createNewCourseService"
import FilterCourseService from "../../services/course/filterCourseService"
import GetActiveCoursesService from "../../services/course/getActiveCoursesService"
import UpdateCourseInformationsService from "../../services/course/updateCourseInformationsService"
import InsertNewQuestionService from "../../services/question/insertNewQuestionService"
import InsertQuestionAnswerService from "../../services/question_answer/insertQuestionAnswerService"
import AuthStudentService from "../../services/student/authSudentService"
import GetUserProfileService from "../../services/student/getUserProfileService"
import RegisterNewStudentService from "../../services/student/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/student/updateStudentPasswordService"
import UpdateUserProfileService from "../../services/student/updateUserProfileService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()
    const questionModel = new QuestionModel()
    const questionAnswerModel = new QuestionAnswerModel()

    const updateUserProfileService = new UpdateUserProfileService(userModel)

    const filterCourseService = new FilterCourseService(
      courseModel,
      questionModel,
      questionAnswerModel
    )

    const insertQuestionAnswerService = new InsertQuestionAnswerService(
      userModel,
      courseModel,
      questionModel,
      questionAnswerModel
    )

    const insertNewQuestionService = new InsertNewQuestionService(
      userModel,
      courseModel,
      questionModel
    )

    const getActiveCoursesService = new GetActiveCoursesService(courseModel)

    const updateCourseInformationsService = new UpdateCourseInformationsService(
      userModel,
      courseModel
    )

    const createNewCourseService = new CreateNewCourseService(userModel, courseModel)

    const getUserProfileService = new GetUserProfileService(userModel)

    const authStudentService = new AuthStudentService(userModel)

    const updateStudentPasswordService = new UpdateStudentPasswordService(userModel)

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
      updateUserProfileService,
      getUserProfileService,
      filterCourseService,
      insertQuestionAnswerService,
      insertNewQuestionService,
      getActiveCoursesService,
      updateCourseInformationsService,
      createNewCourseService,
      authStudentService,
      updateStudentPasswordService,
      registerNewStudentService,
    }
  }
}
