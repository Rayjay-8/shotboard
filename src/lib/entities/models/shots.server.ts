import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { storyboard } from './storyboard.server'
import { midias } from './midias.server'


export const typeShots = ["Extreme wide" , "wide" , "up shot" , "down shot" , "medium shot" ,  "over shouder", "dolly" , "tilt up","tilt down","close up", "extreme close up"]

export type Shots = {
   id_shot: number
   progresso: number
   tipo: typeof typeShots
   dialogo: string
   musica: string
   locucao: string
   id_stotyboard: number
}

export const shots = sqliteTable('shot',{
   id_shot: integer(`id_shot`).primaryKey(),
   progresso: integer('progresso'),
   tipo: text('tipo'),
   dialogo: text('dialogo'),
   musica: text('musica'),
   locucao: text('locucao'),
   id_stotyboard: integer(`id_stotyboard`).notNull().references(() => storyboard.id),
})

export const shotsRelations = relations(shots, ({one, many}) => ({
   storyboard: one(storyboard, {
      fields: [shots.id_stotyboard],
      references: [storyboard.id]
   }),
   midias: many(midias)
}))