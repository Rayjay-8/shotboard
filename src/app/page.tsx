'use server';


import Link from 'next/link'
import { Titulo } from '@/components/ui/Titulo'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getallstoryboard } from '@/lib/queries'
import NovoStory from './NovoStory';
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL
    , isServer = typeof window === 'undefined'


export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})
  
export default async function Home() {
  const data = await getallstoryboard()
  return (
    <main className="">
      <Titulo className="bg-emerald-500">Storyboard</Titulo>
      <div className='flex gap-2 justify-between px-6 py-6 md:px-16'>
        <h2 className='uppercase'>Todos videos</h2>
        <NovoStory/>
      </div>
      <div className='flex flex-wrap py-6 gap-4 px-6 md:px-16'>
        {data.map(e => <>
        <Link href={"/storyboard/"+e.id} key={e.id}>
        <Card key={e.id} className='items-center w-[300px] h-[300px] bg-gray-100 ' 
        >
          <CardHeader>
            <CardTitle>{e.nome}</CardTitle>
            <CardDescription>{e.descricao}</CardDescription>
          </CardHeader>
        </Card>
        </Link>
        </>)}
      </div>
    </main>
  )
}
