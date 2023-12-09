import { NextRequest, NextResponse } from 'next/server';
import fs from "fs/promises"
import fss from "fs"

export async function POST(request: Request) {

   const data = await request.formData()

   const midia = data.get('midia')
   const storyboardid = data.get('storyboard')
   const shotid = data.get('shot')

   if (!midia || !storyboardid || !shotid) {
      throw new Error('Arquivo não encontrado na solicitação.');
    }
    const nomeTratado = (midia.name).trim().replaceAll(" ", "_").replaceAll(":", "_")
    const folderbase = `public/midias/${storyboardid}/${shotid}`
    const filePath =  folderbase +"/"+ nomeTratado;

      try {
         if (!fss.existsSync(folderbase)) {
         fss.mkdirSync(folderbase);
         }
      } catch (err) {
         console.error(err);
      }

    console.log(filePath)

   midia.arrayBuffer().then((buffer) => {
      return fs.writeFile(filePath, Buffer.from(buffer));
    });

   return NextResponse.json({success: true, path: nomeTratado, type:  midia.type});
}

export async function GET(req: NextRequest) {
   // const file = req.url.searchParams
   const filepath = req.nextUrl.searchParams.get('file')
   const storyid = req.nextUrl.searchParams.get('story')
   const shotyid = req.nextUrl.searchParams.get('shot')

   console.log("foi ???", storyid, shotyid, filepath)
   
   if(filepath && storyid && shotyid){
      try {
         
         fs.unlink(`public/midias/${storyid}/${shotyid}/${filepath}`)
      } catch (error) {
         console.log(error)
         
      }
   }
   
   return NextResponse.json({ sessionId: 1234 });
}