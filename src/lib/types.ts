import { z } from "zod";


export const FormSchema = z.object({
   nome: z.string().describe('Nome'),
   descricao: z.string().describe('Descrição'),
   aprovado: z.number(),
   inclusao: z.string()
})

export const ShotSchema = z.object({
   progresso: z.number().optional(),
   tipo: z.string(),
   dialogo: z.string(),
   locucao: z.string(),
   musica: z.string(),
   id_stotyboard: z.number()
})