import { z } from "zod";


export const FormSchema = z.object({
   nome: z.string().describe('Nome'),
   descricao: z.string().describe('Descrição'),
   aprovado: z.number(),
   inclusao: z.string()
})

export const ShotSchema = z.object({
   descricao: z.string(),
   duracao_s: z.coerce.number(),
   ordem: z.coerce.number(),
   progresso: z.number().optional(),
   tipo: z.string().nullish(),
   dialogo: z.string().nullish(),
   // locucao: z.string(),
   // musica: z.string(),
   id_stotyboard: z.number().optional()
})

export const MidiaSchema = z.object({
   principal: z.coerce.boolean(),
   ordem: z.coerce.number(),
   comentario: z.coerce.string().nullish().optional(),
   tipo: z.string(),
   duracao_s: z.coerce.number(),
   dialogo: z.coerce.string().nullish().optional(),
   locucao: z.coerce.string().nullish().optional(),
})