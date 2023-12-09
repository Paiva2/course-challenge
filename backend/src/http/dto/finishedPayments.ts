import { z } from "zod"

export const finishAPaymentDto = z.object({
  professorId: z.string().min(1, { message: "professorId não pode ser vazio." }),
  pendingPaymentId: z
    .string()
    .min(1, { message: "pendingPaymentId não pode ser vazio." }),
})
