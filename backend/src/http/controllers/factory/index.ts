import CourseModel from "../../database/prisma/model/courseModel"
import UserModel from "../../database/prisma/model/userModel"
import CreateNewCourseService from "../../services/course/createNewCourseService"
import AuthStudentService from "../../services/student/authSudentService"
import RegisterNewStudentService from "../../services/student/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/student/updateStudentPasswordService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()
    const courseModel = new CourseModel()

    const createNewCourseService = new CreateNewCourseService(userModel, courseModel)

    const authStudentService = new AuthStudentService(userModel)

    const updateStudentPasswordService = new UpdateStudentPasswordService(userModel)

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
      createNewCourseService,
      authStudentService,
      updateStudentPasswordService,
      registerNewStudentService,
    }
  }
}
