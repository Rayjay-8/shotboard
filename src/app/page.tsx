import { db } from '@/lib/app/db/db.server'
import Image from 'next/image'
import type { Actions, PageServerLoad } from './types'
import clsx from 'clsx'

// export const actions:any = {

// }


const Titulo = ({children, className}) => {
  return(<>
    <div className={clsx('text-4xl font-bold tracking-wide  w-full p-16', className)}>{children}</div>
  </>)
}

export default async function Home() {
  const data = await db.query.storyboard.findMany()
  console.log(data)
  return (
    <main className="">
      <Titulo className="bg-emerald-500">Storyboard</Titulo>
      <div className='flex gap-2 justify-between px-16 py-6'>
        <h2 className='uppercase'>Todos projetos</h2>
        <button className='uppercase bg-blue-600 text-white p-4 rounded-md'>Novo video</button>
      </div>
      <div className='flex flex-wrap px-16 py-6 gap-4'>
        {data.map(e => <>
        <div className='items-center justify-center flex bg-blue-100 rounded-md center' 
        style={{width: "300px", height: "300px"}}>
          {e.nome}
        </div>
        </>)}
      </div>
    </main>
  )
}
