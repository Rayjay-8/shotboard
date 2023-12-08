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
   ordem: z.number(),
   progresso: z.number().optional(),
   tipo: z.string(),
   dialogo: z.string(),
   locucao: z.string(),
   // musica: z.string(),
   id_stotyboard: z.number()
})

export const MidiaSchema = z.object({
   principal: z.coerce.boolean(),
   ordem: z.coerce.number(),
   comentario: z.coerce.string().optional(),
   tipo: z.string(),
   duracao_s: z.coerce.number()
})