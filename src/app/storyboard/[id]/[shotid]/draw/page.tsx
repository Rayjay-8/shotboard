import React from 'react'
import UploadMidias from './UploadMidias'
import Link from 'next/link'

const DrawCanvas = ({params}:{params: {id:number, shotid: number}}) => {
  return (
    <>

    <Link href={`/storyboard/${params.id}/${params.shotid}`}>Voltar</Link>
    <div className='p-6'>
      <UploadMidias story={params.id} shot={params.shotid}/>

    </div>
      </>
  )
}

export default DrawCanvas