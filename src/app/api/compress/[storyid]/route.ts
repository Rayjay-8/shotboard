import { NextRequest, NextResponse } from 'next/server';
import fs from "fs/promises"
import { db } from '@/lib/app/db/db.server';
import { midias } from '@/lib/entities';
import { eq } from 'drizzle-orm';
import path from 'path';
import JSZip from 'jszip'

import fss from "fs"

export async function GET(req: NextRequest, rt: any) {
   
   const id = rt?.params?.storyid
   if(!id){
      return NextResponse.json({ nothing: 0 });
   }
   
   // const shotsemidias = await db.select().from(midias).where(eq(midias.id_storyboard, id))
   // console.log(id, shotsemidias)

   const folderPath = 'public/midias'

   const zip = new JSZip();

   const files = fss.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      // console.log(filePath)
      const fileData = fss.readFileSync(filePath);
      zip.file(file, fileData);
    }

   // zip.file("hello.txt", "OK DENTRO DO ARQUIVO")

   const archive = await zip.generateAsync({type:"blob"})

   return new Response(archive, {
      status: 200,
      headers: {
         'content-Type': 'application/zip'
      }
   })
}