"use server";
import { Titulo } from '@/components/ui/Titulo'
import React from 'react'

import ListaMidias from './listaMidias'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getMidiasShot, getShotinfo, getShotsStory } from '@/lib/queries'

// Aqui ficaram todas as informação do shot selecionado, desenho, imagens, videos, musica, tempo...
const page = async ({params}:{params: {id:number, shotid: number}}) => {
  const listaMidias = await getMidiasShot(params.shotid)
  const shotinfo = await getShotinfo(params.shotid)

  const TOTAL = listaMidias?.reduce((acc, value) => acc + value?.duracao_s ?? 0, 0)

  console.log(listaMidias, TOTAL, shotinfo)
  
  return (
    <main className="">
      <Titulo className="bg-blue-200">
         
         Shot - {shotinfo.descricao}
         <p>
         {TOTAL}s de {shotinfo.duracao_s}s

         </p>
         </Titulo>
         {shotinfo?.dialogo && <div className="bg-gray-100 p-4">
            <p><b>Dialogo: </b>
            {shotinfo.dialogo}</p>
         </div>}
         {shotinfo?.locucao && <div className="bg-gray-100 p-4">
            <p><b>Locução: </b>
            {shotinfo.locucao}</p>
         </div>}
         <div className='px-6 md:px-16 py-6 flex justify-between'>
          <div>Envie midias para o shot</div>
            <Link href={params.shotid+"/draw"}>
              <Button>Enviar</Button>
            </Link>
         </div>
         <ListaMidias shot={params.shotid} listaMidias={listaMidias}/>
    </main>
  )
}

export default page