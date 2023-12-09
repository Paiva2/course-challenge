import { describe, it, expect, beforeEach } from "vitest"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import GetUserProfileService from "../../student/getUserProfileService"
import { IUser } from "../../../@types/types"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let fakeUser: IUser

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService

let sut: GetUserProfileService

describe("Get User Profile Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    sut = new GetUserProfileService(inMemoryUser)

    fakeUser = await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
    })
  })

  it("should get an user profile", async () => {
    const getUser = await sut.exec({
      userId: fakeUser.id as string,
    })

    expect(getUser).toEqual(
      expect.objectContaining({
        id: fakeUser.id,
        name: "John Doe",
        role: "student",
      })
    )
  })

  it("should not get an user profile without an provided user id", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do usuário inválido.",
      })
    )
  })

  it("should not get an user profile if user id doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Inexistent user id",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Usuário não encontrado.",
      })
    )
  })
})
