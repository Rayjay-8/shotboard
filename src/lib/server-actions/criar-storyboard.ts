'use server';

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../app/db/db.server";
import { Storyboard, storyboard } from "../entities";


import { cookies } from 'next/headers';

export const createnovostoryboard = async (data:Storyboard) => {
   try {
      const ret = await db.insert(storyboard).values(data)
      console.log("ret", ret)
      revalidateTag('storyboard')
      return ret
   } catch (error) {
      console.log(error)
      return []
   }
}


