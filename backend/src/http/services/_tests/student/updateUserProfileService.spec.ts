import { describe, it, expect, beforeEach } from "vitest"
import { IUser } from "../../../@types/types"
import { compare } from "bcryptjs"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import UpdateUserProfileService from "../../student/updateUserProfileService"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let fakeUser: IUser

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService

let sut: UpdateUserProfileService

describe("Update user profile service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    sut = new UpdateUserProfileService(inMemoryUser)

    fakeUser = await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
      email: "johndoe@email.com",
    })
  })

  it("should get an user profile", async () => {
    const updateProfile = await sut.exec({
      userId: fakeUser.id as string,
      fields: {
        name: "John Doe Updated",
        password: "change my password",
      },
    })

    const doesNewPasswordMatches = await compare(
      "change my password",
      updateProfile.password as string
    )

    expect(doesNewPasswordMatches).toBeTruthy()

    expect(updateProfile).toEqual(
      expect.objectContaining({
        id: fakeUser.id,
        name: "John Doe Updated",
      })
    )
  })

  it("should get an user profile without an provided user id", async () => {
    await expect(() => {
      return sut.exec({
        userId: "",
        fields: {
          name: "John Doe Updated",
          password: "change my password",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Id do usuário inválido.",
      })
    )
  })

  it("should get an user profile if user doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        userId: "Inexistent user id",
        fields: {
          name: "John Doe Updated",
          password: "change my password",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Usuário não encontrado.",
      })
    )
  })

  it("should get an user profile name if there already has an existing name like that registered", async () => {
    await expect(() => {
      return sut.exec({
        userId: fakeUser.id as string,
        fields: {
          name: "John Doe",
          password: "change my password",
        },
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Um usuário já possui esse nome cadastrado.",
      })
    )
  })
})
