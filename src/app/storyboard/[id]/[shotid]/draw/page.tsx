import React from 'react'
import UploadMidias from './UploadMidias'

const DrawCanvas = ({params}:{params: {id:number, shotid: number}}) => {
  return (
    <>
      <div className='p-0'>
        <UploadMidias story={params.id} shot={params.shotid}/>
      </div>
    </>
  )
}

export default DrawCanvas