'use server';
import { eq } from "drizzle-orm";
import { db } from "./app/db/db.server"
import { Storyboard, midias, shots, storyboard } from "./entities"

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


export const  getShotsStory = async (idstory:number) => {
   try {
      const data = await db.select().from(shots).where(eq(shots.id_stotyboard, idstory))
      return data
   } catch (error) {
      console.log(error)
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