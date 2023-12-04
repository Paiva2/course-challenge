import UserModel from "../../database/prisma/model/userModel"
import AuthStudentService from "../../services/student/authSudentService"
import RegisterNewStudentService from "../../services/student/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/student/updateStudentPasswordService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()

    const authStudentService = new AuthStudentService(userModel)

    const updateStudentPasswordService = new UpdateStudentPasswordService(userModel)

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
      authStudentService,
      updateStudentPasswordService,
      registerNewStudentService,
    }
  }
}
