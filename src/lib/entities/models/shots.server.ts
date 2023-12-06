import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { storyboard } from './storyboard.server'
import { medias } from './midias.server'

export type Shots = {
   id_shot: number
   progresso: number
   tipo: "top-down" | "tilt" | "wide" | "close"
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
   medias: many(medias)
}))