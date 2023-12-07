"use client";
import React, { useState } from 'react'
import axios from "axios"
import { createMidiasShot } from '@/lib/server-actions/criar-shot';

const UploadMidias = ({story, shot}) => {
   
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
            const midiavinculada = await createMidiasShot({
               id_storyboard: story,
               id_shot: shot,
               principal: 0,
               path: data.path,
               tipo: 'image'
            })
            console.log("midiavinculada", midiavinculada)
            // setbloburl("/midias/"+data.path)
         } catch (error) {
            console.log("Erro ao salvar")
         }
      }
   }

  return (<>
    <div>
            <h2>Faça upload localmente das midias</h2>
            <input type="file" name="upload" id="upload" onChange={onUpload} />
            <button>Salvar desenho</button>
         </div>
         </>
  )
}

export default UploadMidias