import CourseModel from "../../database/prisma/model/courseModel"
import UserModel from "../../database/prisma/model/userModel"
import CreateNewCourseService from "../../services/course/createNewCourseService"
import GetActiveCoursesService from "../../services/course/getActiveCoursesService"
import UpdateCourseInformationsService from "../../services/course/updateCourseInformationsService"
import AuthStudentService from "../../services/student/authSudentService"
import RegisterNewStudentService from "../../services/student/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/student/updateStudentPasswordService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()

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
      getActiveCoursesService,
      updateCourseInformationsService,
      createNewCourseService,
      authStudentService,
      updateStudentPasswordService,
      registerNewStudentService,
    }
  }
}
