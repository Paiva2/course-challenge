import { z } from "zod"

export const createNewCourseDto = z.object({
  course: z.object({
    title: z
      .string({ invalid_type_error: "Título precisa ser um tipo string." })
      .min(1, { message: "Título não pode ser vazio." }),

    duration: z
      .number({
        invalid_type_error: "Duração precisa ser um tipo numérico inteiro.",
      })
      .min(1, { message: "Duração não pode ser vazia." }),

    description: z
      .string({
        invalid_type_error: "Descrição precisa ser um tipo string.",
      })
      .min(1, { message: "Descrição não pode ser vazia." }),
  }),
})

export const updateCourseDto = z.object({
  course: z.object({
    title: z
      .string({ invalid_type_error: "Título precisa ser um tipo string." })
      .min(1, { message: "Título não pode ser vazio." })
      .nullable(),

    duration: z
      .number({
        invalid_type_error: "Duração precisa ser um tipo numérico inteiro.",
      })
      .min(1, { message: "Duração não pode estar vazia." })
      .nullable(),

    description: z
      .string({ invalid_type_error: "Descrição precisa ser um tipo string." })
      .min(1, { message: "Descrição não pode ser vazio." })
      .nullable(),

    active: z
      .boolean({
        invalid_type_error: "Ativo precisa ser um tipo booleano (true/false).",
      })
      .nullable(),
  }),
})
