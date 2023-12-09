import { describe, it, expect, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import UpdateStudentPasswordService from "../../student/updateStudentPasswordService"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService

let sut: UpdateStudentPasswordService

describe("Update Student Password Service", () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    sut = new UpdateStudentPasswordService(inMemoryUser)
  })

  it("should update an student password", async () => {
    await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
    })

    const updatedPassword = await sut.exec({
      name: "John Doe",
      newPassword: "changed",
    })

    const checkIfPasswordChangedCorrectly = await compare(
      "changed",
      updatedPassword.password as string
    )

    expect(checkIfPasswordChangedCorrectly).toBeTruthy()
  })

  it("should not update an password if an name are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "",
        newPassword: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Nome inválido.",
      })
    )
  })

  it("should not update an student password if an new password are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "John Doe",
        newPassword: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Senha inválida.",
      })
    )
  })

  it("should not update an user password if provided user doesn't exists", async () => {
    await expect(() => {
      return sut.exec({
        name: "Inexistent",
        newPassword: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Estudante não encontrado.",
      })
    )
  })
})
