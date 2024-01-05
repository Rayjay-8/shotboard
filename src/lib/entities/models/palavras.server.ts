import { sql } from 'drizzle-orm'
import { SQLiteTimestamp, integer, 
   sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type Palavras = {
   id_palavra: number
   palavra: string
   inclusao: string
   lang: 'pt-br' | 'en'
}

export const palavras = sqliteTable('palavras', {
   id_midia: integer('id_palavra').primaryKey(),
   palavra: text('palavra'),
   lang: text('lang'),
   inclusao: text("inclusao").default(sql`CURRENT_TIMESTAMP`)
})



