import { relations, sql } from 'drizzle-orm';
import { integer, blob, BaseSQLiteDatabase, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { shots } from "./shots.server"


export type Storyboard = {
	id?: number
	nome: string
	descricao: string
	thumb?: string
	aprovado: number
   inclusao: string
}

export const storyboard = sqliteTable(`storyboard`, {
   id: integer(`id`).primaryKey(),
   nome: text('nome').notNull(),
   descricao: text(`descricao`),
   thumb: text('thumb'),
   aprovado: integer('aprovado'),
   inclusao: text(`inclusao`)
})

export const storyboardRelations =  relations(storyboard, ({one, many}) => ({
   shots: many(shots)
}))

