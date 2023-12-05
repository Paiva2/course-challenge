import { z } from "zod"

export const insertNewQuestionDto = z.object({
  courseId: z
    .string({ invalid_type_error: "courseId precisa ser do tipo string." })
    .min(1, { message: "O id do curso não pode ser vazio." }),

  content: z
    .string({ invalid_type_error: "content precisa ser do tipo string." })
    .min(1, { message: "O conteúdo da questão não pode ser vazio." }),
})
