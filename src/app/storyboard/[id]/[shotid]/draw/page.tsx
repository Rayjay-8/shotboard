"use server";
import React from 'react'
import UploadMidias from './UploadMidias'
import style from "./better.module.css"
import { getMidiasShot } from '@/lib/queries';


const DrawCanvas = async ({params}:{params: {id:number, shotid: number}}) => {

  const listaMidias = await getMidiasShot(params.shotid)
  return (
    <>
      <div className={style.main}>
        <UploadMidias story={params.id} shot={params.shotid} midias={listaMidias}/>
      </div>
    </>
  )
}

export default DrawCanvas