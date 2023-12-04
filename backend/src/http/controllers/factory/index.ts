import UserModel from "../../database/prisma/model/userModel"
import RegisterNewStudentService from "../../services/registerNewStudentService"
import UpdateStudentPasswordService from "../../services/updateStudentPasswordService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()

    const updateStudentPasswordService = new UpdateStudentPasswordService(userModel)

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
      updateStudentPasswordService,
      registerNewStudentService,
    }
  }
}
