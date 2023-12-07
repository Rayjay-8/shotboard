
import { Titulo } from '@/components/ui/Titulo'
import React from 'react'
import UploadMidias from './UploadMidias'
import ListaMidias from './listaMidias'

// Aqui ficaram todas as informação do shot selecionado, desenho, imagens, videos, musica, tempo...
const page = async ({params}:{params: {id:number, shotid: number}}) => {
   console.log("params", params)   

  
  return (
    <main className="">
      <Titulo className="bg-blue-200">
         Storyboard #{params.id} - 
         Shot #{params.shotid}
         </Titulo>
         <UploadMidias story={params.id} shot={params.shotid}/>

         <div>
            <h1>Lista card midias</h1>
            <ListaMidias shot={params.shotid}/>
         </div>
    </main>
  )
}

export default page