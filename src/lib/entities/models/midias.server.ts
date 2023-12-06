import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { shots } from './shots.server'


export type Medias = {
   id_media: number
   id_shot: number
   principal: number
   path: string
   tipo: `video` | `imagem` | `audio`
}

export const medias = sqliteTable('midias', {
   id_media: integer('id_media').primaryKey(),
   id_shot: integer('id_shot').notNull().references(() => shots.id_shot),
   principal: integer(`principal`),
   path: text('path'),
   tipo: text('tipo')
})

export const mediasRelations = relations(medias, ({one}) => ({
   shots: one(shots, {
      fields: [medias.id_shot],
      references: [shots.id_shot]
   })
}))