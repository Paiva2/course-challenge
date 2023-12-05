import { z } from "zod"

export const registerNewStudentDto = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome precisa ter pelo menos 3 caracteres." }),

    password: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),

    passwordConfirmation: z
      .string()
      .min(1, { message: "A confirmação de senha não pode estar vazia." }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Confirmação de senha e senha não conferem.",
  })

export const updateStudentPasswordDto = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome precisa ter pelo menos 3 caracteres." }),

    newPassword: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),

    passwordConfirmation: z
      .string()
      .min(1, { message: "A confirmação de senha não pode estar vazia." }),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Confirmação de senha e senha não conferem.",
  })

export const authStudentDto = z.object({
  name: z.string().min(3, { message: "Nome precisa ter pelo menos 3 caracteres." }),

  password: z
    .string()
    .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),
})

export const updateUserProfileDto = z.object({
  fields: z.object({
    name: z
      .string()
      .min(3, { message: "Nome precisa ter pelo menos 3 caracteres." })
      .optional(),

    password: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." })
      .optional(),
  }),
})
