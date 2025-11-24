import { z } from "zod"

export const FiltersSchema = z.object({
  search: z.string(),
})

export type FiltersInfer = z.infer<typeof FiltersSchema>

export const CampaignFormSchema = z.object({
  segment: z.string().min(1, 'Selecione um segmento'),
  message: z.string().min(1, 'Digite a mensagem'),
  clients: z.array(z.string()).min(1, 'Selecione pelo menos um tipo de cliente'),
  multiplier: z.coerce.number().min(1, 'Informe o multiplicador'),
  validity: z.coerce.number().min(1, 'Informe a validade'),
  notificationCost: z.coerce.number().min(0, 'Informe o valor da notificação'),
})

export type CampaignFormSchemaInfer = z.infer<typeof CampaignFormSchema>
