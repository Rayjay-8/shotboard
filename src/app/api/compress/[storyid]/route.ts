import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/app/db/db.server';
import { midias, shots } from '@/lib/entities';
import { eq } from 'drizzle-orm';
import path from 'path';
import JSZip from 'jszip'
import fs from "fs"

export async function GET(req: NextRequest, rt: any) {
   
   const id = rt?.params?.storyid
   if(!id){
      return NextResponse.json({ nothing: 0 });
   }

   const midiasInfo = await db.select().from(midias).where(eq(midias.id_storyboard, id))
   const shotsInfo = await db.select().from(shots).where(eq(shots.id_stotyboard, id))
   
   const folderPath = 'public/midias/'+id

   const zip = new JSZip();
   
   const shotsFolders = fs.readdirSync(folderPath);
   for(const shots of shotsFolders){
      const shotF = folderPath+"/"+shots
      const files = fs.readdirSync(shotF);
      const foldername = `shot_${shots}`
      zip.folder(foldername);
      const shotI = shotsInfo.find(e => e.id_shot == shots)
      if(shotI){
         zip.file(foldername+"/info.txt", JSON.stringify(shotI))
      }
      for (const file of files) {
         const filePath = path.join(shotF, file);
         const fileData = fs.readFileSync(filePath);
         const getordem = midiasInfo.find(e => e.path === file)
         zip.file(foldername + "/ordem_" + getordem?.ordem+"_"+file, fileData);
       }
   }

   const archive = await zip.generateAsync({ type:"blob"})

   return new Response(archive, {
      status: 200,
      headers: {
         'content-Type': 'application/zip'
      }
   })
}