import { describe, it, expect, beforeEach } from "vitest"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import AuthStudentService from "../../student/authSudentService"

let inMemoryUser: InMemoryUser

let registerNewStudentService: RegisterNewStudentService

let sut: AuthStudentService

describe("Auth Student Service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()

    registerNewStudentService = new RegisterNewStudentService(inMemoryUser)

    await registerNewStudentService.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
    })

    sut = new AuthStudentService(inMemoryUser)
  })

  it("should auth an student", async () => {
    const authUser = await sut.exec({
      name: "John Doe",
      password: "123456",
    })

    expect(authUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "John Doe",
        role: "student",
      })
    )
  })

  it("should not auth an user if an valid name are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "",
        password: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Nome inválido.",
      })
    )
  })

  it("should not auth an user if an valid password are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "John Doe",
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
        name: "Inexistent",
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
        name: "John Doe",
        password: "wrong pass",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Credenciais inválidas.",
      })
    )
  })
})
