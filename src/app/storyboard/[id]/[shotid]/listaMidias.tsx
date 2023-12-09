"use server";

import { getMidiasShot } from '@/lib/queries'
import React from 'react'
import MidiaActions from './MidiaActions';

const ListaMidias = async ({shot, listaMidias}:{shot:number}) => {
  // const listaMidias = await getMidiasShot(shot)
  return (
    <div className='flex flex-wrap px-6 md:px-16 py-6 gap-4'>
      <MidiaActions listaMidias={listaMidias}/>
    </div>
  )
}

export default ListaMidias