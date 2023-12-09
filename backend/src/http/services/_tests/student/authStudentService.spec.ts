import { describe, it, expect, beforeEach } from "vitest"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import AuthStudentService from "../../student/authSudentService"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet

let registerNewStudentService: RegisterNewStudentService

let sut: AuthStudentService

describe("Auth Student Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()

    registerNewStudentService = new RegisterNewStudentService(
      inMemoryUser,
      inMemoryWallet
    )

    await registerNewStudentService.exec({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      role: "student",
    })

    sut = new AuthStudentService(inMemoryUser)
  })

  it("should auth an student", async () => {
    const authUser = await sut.exec({
      email: "johndoe@email.com",
      password: "123456",
    })

    expect(authUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "John Doe",
        email: "johndoe@email.com",
        role: "student",
      })
    )
  })

  it("should not auth an user if an valid email are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        email: "",
        password: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "E-mail inválido.",
      })
    )
  })

  it("should not auth an user if an valid password are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        email: "johndoe@email.com",
        password: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Senha inválida.",
      })
    )
  })

  it("should not auth an user if user doens't exists", async () => {
    await expect(() => {
      return sut.exec({
        email: "Inexistent",
        password: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Estudante não encontrado.",
      })
    )
  })

  it("should not auth an user if credentials are wrong", async () => {
    await expect(() => {
      return sut.exec({
        email: "johndoe@email.com",
        password: "wrong pass",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Credenciais inválidas.",
      })
    )
  })
})
