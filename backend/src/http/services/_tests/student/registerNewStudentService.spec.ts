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
      email: "johndoe@email.com",
      password: "123456",
      role: "student",
    })

    expect(newUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      })
    )
  })

  it("should not register a new student if name are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "",
        email: "johndoe@email.com",
        password: "123456",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Nome inválido.",
      })
    )
  })

  it("should not register a new student if e-mail are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "John Doe",
        email: "",
        password: "123456",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "E-mail inválido.",
      })
    )
  })

  it("should not register a new student if password are not provided on request", async () => {
    await expect(() => {
      return sut.exec({
        name: "John Doe",
        email: "johndoe@email.com",
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
    await sut.exec({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      role: "student",
    })

    await expect(() => {
      return sut.exec({
        name: "John Doe",
        password: "123456",
        email: "johndoe@email.com",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Um estudante com esse nome já existe cadastrado.",
      })
    )
  })

  it("should not register a new student if an user with provided email already exists", async () => {
    await sut.exec({
      name: "John Doe 2",
      email: "johndoe@email.com",
      password: "123456",
      role: "student",
    })

    await expect(() => {
      return sut.exec({
        name: "John Doe",
        password: "123456",
        email: "johndoe@email.com",
        role: "student",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        message: "Um estudante com esse e-mail já existe cadastrado.",
      })
    )
  })
})
