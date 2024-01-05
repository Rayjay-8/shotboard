'use server';
import { eq, gt } from "drizzle-orm";
import { db } from "./app/db/db.server"
import { Storyboard, midias, palavras, shots, storyboard } from "./entities"

export const getallstoryboard = async () => {
   try {
      const data = await db.query.storyboard.findMany()
      if(data){
         return data
      }
      return []
   } catch (error) {
      console.log(error)
      return []
   }
}

export const getStoryboard = async (id:number) => {
   try {
      const data = await db.select().from(storyboard).where(eq(storyboard.id, id)).limit(1)
      return {data: data?.[0]}
   } catch (error) {
      return {error: true, data: null}
   }
}


export const  getShotsStory = async (idstory:number) => {
   try {
      const data = await db.select().from(shots).where(eq(shots.id_stotyboard, idstory)).orderBy(shots.ordem)
      return data
   } catch (error) {
      console.log(error)
   }
}

export const getShotinfo = async (idshot:number) => {
   try {
      const data = await db.select().from(shots).where(eq(shots.id_shot, idshot))
      return data[0] ?? null
   } catch (error) {
      console.log(error)
      return {error: true, data: null}
   }
}


export const getMidiasShot = async (idshot:number) => {
   try {
      const data = await db.select().from(midias).where(eq(midias.id_shot, idshot)).orderBy(midias.ordem)
      return data
   } catch (error) {
      console.log(error)
   }
}

export const getPalavrasDoDia = async () => {
   try {
      var hoje = new Date();
      // const ontem = new Date(hoje)
      // ontem.setDate(hoje.getDate() - 1);
      
      hoje.setHours(0, 0, 0, 0);
      console.log("hoje", hoje.toISOString())
      const data = await db.select().from(palavras).where(gt(palavras.inclusao, hoje.toISOString()))
      return data
   } catch (error) {
      console.log("erro 123445")
   }
}