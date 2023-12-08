"use server";

import { getMidiasShot } from '@/lib/queries'
import React from 'react'
import MidiaActions from './MidiaActions';

const ListaMidias = async ({shot}:{shot:number}) => {

   const listaMidias = await getMidiasShot(shot)
  //  console.log(listaMidias)

  return (
    <div className='flex flex-wrap px-16 py-6 gap-4'>
      <MidiaActions listaMidias={listaMidias}/>
    </div>
  )
}

export default ListaMidias