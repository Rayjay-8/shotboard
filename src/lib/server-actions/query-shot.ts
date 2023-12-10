'use server';

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../app/db/db.server";
import { Midias, Shots, midias, shots } from "../entities";
import { eq } from "drizzle-orm";
import axios from "axios";
import { api } from "@/app/page";

export const createshot = async (data: Shots) => {
   try {
      const ret = await db.insert(shots).values(data)
      revalidateTag('shots')
      return ret
   } catch (error) {
      console.log(error)
      return []
   }
}

export const editShot = async (id: number, newdata:Partial<Shots>) => {
   try {
      const ret = await db.update(shots).set(newdata).where(eq(shots.id_shot, id))
      revalidateTag('shots')
      return { data : ret}
   } catch (error) {
      return ({error: true, data: null})
   }
}

export const deleteShot = async (id:number) => {
   try {
      const retmid = await db.delete(midias).where(eq(midias.id_shot, id))
      const ret = await db.delete(shots).where(eq(shots.id_shot, id))
      revalidateTag('shots')
      return ret
   } catch (error) {
      return ({error: true, data: null})
   }
}

export const createMidiasShot = async (data:Midias) => {
   try {
      const ret = await db.insert(midias).values(data)
      revalidateTag('midias')
      return ret
   } catch (error) {
      console.log(error)
   }
}

export const updateMidiasShot = async (id:number, data:Partial<Midias>) => {
   try {
      const ret = await db.update(midias).set(data).where(eq(midias.id_midia,id))
      revalidateTag('midias')
      return { data: null, error: null }
   } catch (error) {
      console.log(error)
   }
}

export const deleteMidiaShot = async (idstory:number, idshot:number, idmidia:number) => {
   try {

      const midiaInfo = await db.select().from(midias).where(eq(midias.id_midia, idmidia)).limit(1)
      
      if(midiaInfo.length){
         const med = midiaInfo[0]
         const url = `/api/midia?story=${idstory}&shot=${idshot}&file=${med.path}`
         
         await api.get(url)
      }

      const ret = await db.delete(midias).where(eq(midias.id_midia, idmidia))
      revalidateTag('midias')
      return { data: null, error: null }
   } catch (error) {
      console.log(error)
   }
}


