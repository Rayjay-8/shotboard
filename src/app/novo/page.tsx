'use client';

import { Titulo } from '@/components/ui/Titulo'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { FormSchema } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { createnovostoryboard } from '@/lib/server-actions/criar-storyboard';


const Novo = () => {
 
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    mode:"onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      aprovado: 0,
      inclusao: new Date().toISOString()
    }
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (formData:any) => {
    console.log("formData",formData)
    const da = await createnovostoryboard(formData)
    console.log("data", da)
    router.replace('/')
  }

  return (
    <main className="h-full">
      <Titulo className='bg-cyan-500'>Novo Video</Titulo>
      <div className='flex justify-center h-full items-center'>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-6 w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'>

          <FormField
            disabled={isLoading}
            control={form.control}
            name='nome'
            render={({field}) => {
              return(<FormItem>
              <FormControl>
                <Input type='text' placeholder='Nome' {...field}/>
              </FormControl>
            </FormItem>)
            }}></FormField>

          <FormField
              disabled={isLoading}
              control={form.control}
              name='descricao'
              render={({field}) => {
                return(<FormItem>
                <FormControl>
                  <Input type='text' placeholder='Descrição' {...field}/>
                </FormControl>
              </FormItem>)
              }}></FormField>

            <Button size='lg' disabled={isLoading} type='submit' className='w-full p-6'>{!isLoading ? `Criar` : <Loader/>}</Button>
        </form>
      </Form>
      </div>
    </main>
  )
}

export default Novo