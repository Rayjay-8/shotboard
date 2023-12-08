"use client";
import React, { useState } from 'react'
import axios from "axios"
import { createMidiasShot } from '@/lib/server-actions/criar-shot';
import { typefind } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';


const UploadMidias = ({story, shot}) => {
   
   const { toast } = useToast()
   const onUpload = async (prop) => {
      console.log(prop)
      if(prop.target.files){
         const file = prop.target.files[0];
         // setbloburl(URL.createObjectURL(file))
         try {
            const formData = new FormData();
            formData.append('midia', file);
            const { data } = await axios.post("/api/midia", formData)
            console.log(data)
            const tipomidia = typefind(data.type)
            const midiavinculada = await createMidiasShot({
               id_storyboard: story,
               id_shot: shot,
               principal: 0,
               path: data.path,
               tipo: tipomidia,
               ordem: 0,
               comentario: ''

            })
            console.log("midiavinculada", midiavinculada)
            // setbloburl("/midias/"+data.path)
            toast({
               title: "Mídia adicionada!",

               description: `${shortString(data.path)} - ${tipomidia}`
            })
         } catch (error) {
            console.log(error)
            console.log("Erro ao salvar")
            toast({
               title: "Erro ao Salvar!",
               description: `Error: ${error}`
            })
         }
      }
   }

  return (<>
    <div>
            <h2>Faça upload localmente das midias</h2>
            <input type="file" name="upload" id="upload" onChange={onUpload} />
         </div>
         </>
  )
}

export default UploadMidias