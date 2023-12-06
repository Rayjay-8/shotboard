'use server';
import { db } from "./app/db/db.server"
import { Storyboard, storyboard } from "./entities"

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

