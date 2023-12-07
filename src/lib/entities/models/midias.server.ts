import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { shots } from './shots.server'
import { storyboard } from '..'


export type Midias = {
   id_media: number
   id_shot: number
   id_storyboard: number
   principal?: number
   path: string
   tipo: `video` | `image` | `audio`
}

export const midias = sqliteTable('midias', {
   id_media: integer('id_media').primaryKey(),
   id_shot: integer('id_shot').notNull().references(() => shots.id_shot),
   id_storyboard: integer('id_storyboard').notNull().references(() => storyboard.id),
   principal: integer(`principal`),
   path: text('path'),
   tipo: text('tipo')
})

export const midiasRelations = relations(midias, ({one}) => ({
   storyboard: one(storyboard, {
      fields: [midias.id_storyboard],
      references: [storyboard.id]
   }),
   shots: one(shots, {
      fields: [midias.id_shot],
      references: [shots.id_shot]
   })
}))