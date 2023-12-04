import UserModel from "../../database/prisma/model/userModel"
import RegisterNewStudentService from "../../services/registerNewStudentService"

export default class Factory {
  public static async exec() {
    const userModel = new UserModel()

    const registerNewStudentService = new RegisterNewStudentService(userModel)

    return {
      registerNewStudentService,
    }
  }
}
