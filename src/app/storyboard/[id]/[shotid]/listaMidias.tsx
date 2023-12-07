"use server";
import { Midias } from '@/lib/entities';
import { getMidiasShot } from '@/lib/queries'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const CardMidia = (props:Midias) => {
return(<Card className='items-center w-[300px] h-[300px] bg-gray-100 '>
<CardHeader>
   <CardTitle>#{props.id_media}</CardTitle>
   <Image alt={"Midia #"+props.id_media} style={{objectFit: "contain"}} width={250} height={200} src={'/midias/'+props.path}/>
</CardHeader>
</Card>)
}

const ListaMidias = async ({shot}:{shot:number}) => {

   const listaMidias = await getMidiasShot(shot)
   console.log(listaMidias)

  return (
    <div className='flex flex-wrap px-16 py-6 gap-4'>
      {listaMidias?.map(media => <CardMidia key={media.id_media} {...media}/>)}
    </div>
  )
}

export default ListaMidias