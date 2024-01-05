import { db } from '@/lib/app/db/db.server';
import { palavras } from '@/lib/entities';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   const data = await request.text()
   try {
      const {texto} = JSON.parse(data)
      const listaPalavras = texto.split(" ")
      for(const pa of listaPalavras){
         if(!pa){
            continue
         }

         const hoje = new Date()
         hoje.setTime(hoje.getTime() - 3 * 60 * 60 * 1000);
         await db.insert(palavras).values({
            palavra: pa,
            lang: 'pt-BR',
            inclusao: hoje.toISOString()
         })
      }

      console.log("texto:", texto)
      
   } catch (error) {
      console.log(error)
      return NextResponse.json({ error: true }, { status: 400 })
   }
   
   return NextResponse.json({ received: true }, { status: 200 });
}