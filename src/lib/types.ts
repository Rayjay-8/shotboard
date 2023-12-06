import { z } from "zod";


export const FormSchema = z.object({
   nome: z.string().describe('Nome'),
   descricao: z.string().describe('Descrição'),
   aprovado: z.number(),
   inclusao: z.string()
})

