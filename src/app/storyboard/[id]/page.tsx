
export const dynamic = 'force-dynamic';

import { Titulo } from '@/components/ui/Titulo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shots } from '@/lib/entities';
import { getShotsStory } from '@/lib/queries';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

import { Button } from '@/components/ui/button';
import CardShotNew from './NovoShot';
import DeleteStory from './DeleteStory';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CardShot = (props:Shots & {index:number}) => {
   return <>
   <Card className='items-center w-[300px] h-[300px] bg-gray-100 '>
      <CardHeader>
         <CardTitle>#{props.index}</CardTitle>
         </CardHeader>
         <CardContent>
            <CardDescription>Descrição: {props.descricao}</CardDescription>
            <CardDescription>Dialogo: {props.dialogo}</CardDescription>
            <CardDescription>Locucao: {props.locucao}</CardDescription>
            <CardDescription>Musica: {props.musica}</CardDescription>
            <CardDescription>Ordem: {props.ordem}</CardDescription>
            <CardDescription>Segundos: {props.duracao_s}</CardDescription>
         </CardContent>
         <CardFooter>
         {props.tipo ? <Badge variant="default" style={{width: '100%'}}>{props.tipo}</Badge> : null}
         <Progress value={props.progresso} />
         </CardFooter>
      </Card>
   </>
}

const page =  async ({params}:{params: {id:number}}) => {
   console.log(params)

   const algo = await getShotsStory(params.id)
   console.log(algo)
  return (
   <main className="">
      <Titulo className="bg-orange-200">Storyboard N° {params.id}</Titulo>
      <div className='flex gap-2 justify-between px-16 py-6'>
        <h2 className='uppercase'>Lista de shots</h2>
        <DeleteStory idStoryboard={params.id}/>
      </div>
    <div className='flex flex-wrap px-16 py-6 gap-4'>
      {algo?.map((e, index) => <Link href={"/storyboard/"+params.id+"/"+e.id_shot}> <CardShot key={e.id_shot} index={index+1} {...e}/></Link>)}
      <CardShotNew forStory={params.id}/>
    </div>
    </main>
  )
}

export default page