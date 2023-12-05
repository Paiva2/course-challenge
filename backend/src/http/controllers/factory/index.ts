import CourseModel from "../../database/prisma/model/courseModel"
import QuestionModel from "../../database/prisma/model/questionModel"
import UserModel from "../../database/prisma/model/userModel"
import CreateNewCourseService from "../../services/course/createNewCourseService"
import GetActiveCoursesService from "../../services/course/getActiveCoursesService"
import UpdateCourseInformationsService from "../../services/course/updateCourseInformationsService"
import InsertNewQuestionService from "../../services/question/insertNewQuestionService"
import AuthStudentService from "../../services/student/authSudentService"
import RegisterNewStudentService from "../../services/student/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/student/updateStudentPasswordService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()
    const questionModel = new QuestionModel()

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

    const authStudentService = new AuthStudentService(userModel)

    const updateStudentPasswordService = new UpdateStudentPasswordService(userModel)

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
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
