import { NextRequest, NextResponse } from 'next/server';
import fs from "fs/promises"

export async function POST(request: Request) {

   const data = await request.formData()

   const midia = data.get('midia')

   // Certifique-se de que midia é um arquivo antes de prosseguir
   if (!midia || !(midia instanceof File)) {
      throw new Error('Arquivo não encontrado na solicitação.');
    }
    const nomeTratado = (midia.name).trim().replaceAll(" ", "_")
    const filePath = "public/midias" + '/' + nomeTratado;

   // Salve o conteúdo do arquivo diretamente
   midia.arrayBuffer().then((buffer) => {
      return fs.writeFile(filePath, Buffer.from(buffer));
    });

   return NextResponse.json({success: true, path: nomeTratado, type:  midia.type});
}

export async function GET(req: NextRequest) {
   // const file = req.url.searchParams
   const filepath = req.nextUrl.searchParams.get('file')
   console.log(filepath)
   if(filepath){
      try {
         
         fs.unlink('public/midias/'+filepath)
      } catch (error) {
         console.log(error)
         
      }
   }
   
   return NextResponse.json({ sessionId: 1234 });
}