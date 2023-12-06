'use server';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Titulo } from '@/components/ui/Titulo'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getallstoryboard } from '@/lib/queries'

// export const actions:any = {

// }

export default async function Home() {
  const data = await getallstoryboard()
  console.log(data, new Date().toISOString())
  return (
    <main className="">
      <Titulo className="bg-emerald-500">Storyboard</Titulo>
      <div className='flex gap-2 justify-between px-16 py-6'>
        <h2 className='uppercase'>Todos videos</h2>
        <Link href="novo">
        <Button>Novo Video</Button>
        </Link>
      </div>
      <div className='flex flex-wrap px-16 py-6 gap-4'>
        {data.map(e => <>
        <Card key={e.id} className='items-center w-[300px] h-[300px] bg-blue-100 ' 
        >
          <CardHeader>
            <CardTitle>{e.nome}</CardTitle>
            <CardDescription>{e.descricao}</CardDescription>
          </CardHeader>
        </Card>
        </>)}
      </div>
    </main>
  )
}
