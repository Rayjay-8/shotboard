import React from 'react'
import UploadMidias from './UploadMidias'
import style from "./better.module.css"
const DrawCanvas = ({params}:{params: {id:number, shotid: number}}) => {
  return (
    <>
      <div className={style.main}>
        <UploadMidias story={params.id} shot={params.shotid}/>
      </div>
    </>
  )
}

export default DrawCanvas