import { z } from "zod"

export const insertNewQuestionAnswerDto = z.object({
  courseId: z
    .string({ invalid_type_error: "courseId precisa ser do tipo string." })
    .min(1, { message: "O id do curso não pode ser vazio." }),

  questionId: z
    .string({ invalid_type_error: "questionId precisa ser do tipo string." })
    .min(1, { message: "O id da questão não pode ser vazio." }),

  content: z
    .string({ invalid_type_error: "content precisa ser do tipo string." })
    .min(1, { message: "O conteúdo da resposta não pode ser vazio." }),
})
