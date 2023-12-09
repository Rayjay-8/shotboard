import { Button } from '@/components/ui/button'
import React from 'react'

const ExportarStory = ({idStoryboard}:{idStoryboard:number}) => {
  return (
    <>
    <a target='_blank' href={'/api/compress/'+idStoryboard}>
    <Button>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>

    Download .zip #{idStoryboard}
    </Button>
    </a>
    </>
  )
}

export default ExportarStory