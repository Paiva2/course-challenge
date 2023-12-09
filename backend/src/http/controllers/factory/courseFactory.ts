import CourseModel from "../../database/prisma/model/courseModel"
import PendingPaymentModel from "../../database/prisma/model/pendingPaymentModel"
import QuestionAnswerModel from "../../database/prisma/model/questionAnswerModel"
import QuestionModel from "../../database/prisma/model/questionModel"
import UserModel from "../../database/prisma/model/userModel"
import CreateNewCourseService from "../../services/course/createNewCourseService"
import FilterCourseService from "../../services/course/filterCourseService"
import GetActiveCoursesService from "../../services/course/getActiveCoursesService"
import UpdateCourseInformationsService from "../../services/course/updateCourseInformationsService"

export default class CourseFactory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()
    const questionModel = new QuestionModel()
    const questionAnswerModel = new QuestionAnswerModel()
    const pendingPaymentModel = new PendingPaymentModel()

    const filterCourseService = new FilterCourseService(
      courseModel,
      questionModel,
      questionAnswerModel
    )

    const getActiveCoursesService = new GetActiveCoursesService(
      courseModel,
      questionModel
    )

    const updateCourseInformationsService = new UpdateCourseInformationsService(
      userModel,
      courseModel
    )

    const createNewCourseService = new CreateNewCourseService(
      userModel,
      courseModel,
      pendingPaymentModel
    )

    return {
      filterCourseService,
      getActiveCoursesService,
      updateCourseInformationsService,
      createNewCourseService,
    }
  }
}
