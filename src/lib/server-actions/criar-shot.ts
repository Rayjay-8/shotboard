'use server';

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../app/db/db.server";
import { Midias, Shots, midias, shots } from "../entities";

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

export const createMidiasShot = async (data:Midias) => {
   try {
      const ret = await db.insert(midias).values(data)
      revalidateTag('midias')
      return ret
   } catch (error) {
      console.log(error)
   }
}