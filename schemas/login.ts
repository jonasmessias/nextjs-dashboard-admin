import { z } from "zod"

export const sendCodeSchema = z.object({
  email: z.string().email("E-mail inválido"),
})

export const validateCodeSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  email: z.string().email("E-mail inválido"),
})

export type SendCodeInfer = z.infer<typeof sendCodeSchema>
export type ValidateCodeInfer = z.infer<typeof validateCodeSchema> 