import { describe, it, expect, beforeEach } from "vitest"
import InMemoryUser from "../../../in-memory/inMemoryUser"
import RegisterNewStudentService from "../../student/registerNewStudentService"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet

let sut: RegisterNewStudentService

describe("Register new student service", () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()

    sut = new RegisterNewStudentService(inMemoryUser, inMemoryWallet)
  })

  it("should register a new student", async () => {
    const newUser = await sut.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
    })

    expect(newUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: newUser.name,
        password: newUser.password,
        role: newUser.role,
      })
    )
  })

  it("should not register a new student if name are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "",
        password: "123456",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Nome inválido.",
      })
    )
  })

  it("should not register a new student if password are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "John Doe",
        password: "",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Senha inválida.",
      })
    )
  })

  it("should not register a new student if an user with provided name already exists", async () => {
    const newUser = await sut.exec({
      name: "John Doe",
      password: "123456",
      role: "student",
    })

    await expect(() => {
      return sut.exec({
        name: "John Doe",
        password: "123456",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Um estudante com esse nome já existe cadastrado.",
      })
    )
  })
})
