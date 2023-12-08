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

   console.log(req)
   return NextResponse.json({ sessionId: 1234 });
   
}