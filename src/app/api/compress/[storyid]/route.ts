import { NextRequest, NextResponse } from 'next/server';
import fs from "fs/promises"
import { db } from '@/lib/app/db/db.server';
import { midias, shots } from '@/lib/entities';
import { eq } from 'drizzle-orm';
import path from 'path';
import JSZip from 'jszip'

import fss from "fs"

export async function GET(req: NextRequest, rt: any) {
   
   const id = rt?.params?.storyid
   if(!id){
      return NextResponse.json({ nothing: 0 });
   }


   const midiasInfo = await db.select().from(midias).where(eq(midias.id_storyboard, id))
   const shotsInfo = await db.select().from(shots).where(eq(shots.id_stotyboard, id))
   
   // const shotsemidias = await db.select().from(midias).where(eq(midias.id_storyboard, id))
   // console.log(id, shotsemidias)

   const folderPath = 'public/midias/'+id

   const zip = new JSZip();

   console.log(shotsInfo)
   const shotsFolders = fss.readdirSync(folderPath);
   for(const shots of shotsFolders){
      const shotF = folderPath+"/"+shots
      const files = fss.readdirSync(shotF);
      // console.log(shots, files)
      const foldername = `shot_${shots}`
      zip.folder(foldername);
      const shotI = shotsInfo.find(e => e.id_shot == shots)
      if(shotI){
         zip.file(foldername+"/info.txt", JSON.stringify(shotI))
      }
      for (const file of files) {
         const filePath = path.join(shotF, file);
         const fileData = fss.readFileSync(filePath);
         const getordem = midiasInfo.find(e => e.path === file)
         // console.log("ordem", getordem?.ordem, getordem, file)
         zip.file(foldername + "/ordem_" + getordem?.ordem+"_"+file, fileData);
       }
   }

   // return NextResponse.json({ok: 123})


   const archive = await zip.generateAsync({ type:"blob"})

   return new Response(archive, {
      status: 200,
      headers: {
         'content-Type': 'application/zip'
      }
   })
}