'use server';

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../app/db/db.server";
import { Storyboard, midias, shots, storyboard } from "../entities";
import { eq } from "drizzle-orm";

export const createnovostoryboard = async (data:Storyboard) => {
   try {
      const ret = await db.insert(storyboard).values(data)
      revalidateTag('storyboard')
      return ret
   } catch (error) {
      console.log(error)
      return []
   }
}

export const deleteStoryboard = async (id:number) => {
   try {
      // todo remover as midia dos shots
      const retshots = await db.delete(shots).where(eq(shots.id_stotyboard, id))
      const ret = await db.delete(storyboard).where(eq(storyboard.id, id))
      console.log(retshots)
      revalidateTag('storyboard')
      return ret
   } catch (error) {
      console.log(error)
      return {erro: true}
   }
}