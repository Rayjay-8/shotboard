"use client";

import React, { useState } from 'react'
import Loader from '@/components/Loader';
import { useForm } from 'react-hook-form'
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { FormSchema, ShotSchema } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createshot } from '@/lib/server-actions/query-shot';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
 import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shots, typeShots } from '@/lib/entities';
import { useToast } from '@/components/ui/use-toast';

const CardShotNew = ({forStory}:{forStory:string}) => {

   const [open, setOpen] = useState(false)
   const form = useForm<z.infer<typeof ShotSchema>>({
      mode:"onBlur",
      resolver: zodResolver(ShotSchema),
      defaultValues: {
         progresso: 0,
         tipo: '',
         dialogo: '',
         locucao: '',
         // musica: '',
         id_stotyboard: parseInt(forStory) ?? 0,
         duracao_s: 1,
         descricao: undefined,
         ordem: 0
      }
    })

    const isLoading = form.formState.isSubmitting;

   //  console.log("form", form.formState.errors, forStory, typeof forStory)

    const { toast } = useToast()

    const onSubmit = async (formData:Shots) => {
      console.log("formData",formData)
      const result = await createshot(formData)
      console.log("result", result)
      toast({
         title: "Voce criou um shot novo",
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(formData, null, 3)}
               </code>
            </pre>
         )
      })
      setOpen(false) 
      
    }

   return <>
   <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
   <Card className='flex justify-center items-center w-[300px] h-[300px] bg-gray-100 '>
      <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-24 h-24 text-gray-400">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
   </Card>
   </DialogTrigger>
   <DialogContent className="sm:max-w-md">
      <DialogHeader>
         <DialogTitle>Novo shot</DialogTitle>
         <Form {...form}>
            <form 
           onSubmit={form.handleSubmit(onSubmit)}
           className='mt-6 w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'>

            <FormField
            disabled={isLoading}
            control={form.control}
            name='descricao'
            render={({field}) => {return(<FormItem>
               <FormControl>
                  <Textarea placeholder='Descrição' {...field}/>
               </FormControl>
               <FormMessage />
            </FormItem>)}}
            ></FormField>

            <FormField
            disabled={isLoading}
            control={form.control}
            name='dialogo'
            render={({field}) => {return(<FormItem>
               <FormControl>
                  <Textarea placeholder='Dialogo' {...field}/>
               </FormControl>
               <FormMessage />
            </FormItem>)}}
            ></FormField>

            <FormField
            disabled={isLoading}
            control={form.control}
            name='locucao'
            render={({field}) => {return(<FormItem>
               <FormControl>
                  <Textarea placeholder='Locução' {...field}/>
               </FormControl>
               <FormMessage />
            </FormItem>)}}
            ></FormField>

            <FormField
            disabled={isLoading}
            control={form.control}
            name='duracao_s'
            render={({field}) => {return(<FormItem>
               <FormLabel>Duração (segundos)</FormLabel>
               <FormControl>
               <Input type='number' placeholder='Duração' {...field}/>
               </FormControl>
               <FormMessage />
            </FormItem>)}}
            ></FormField>

         <FormField
            disabled={isLoading}
            control={form.control}
            name='ordem'
            render={({field}) => {return(<FormItem>
               <FormLabel>Ordem</FormLabel>
               <FormControl>
               <Input type='number' placeholder='Ordem' {...field}/>
               </FormControl>
               <FormMessage />
            </FormItem>)}}
            ></FormField>

            <FormField
            disabled={isLoading}
            control={form.control}
            name='tipo'
            render={({field}) => {return(<FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>

                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Tipo de shot" />
                  </SelectTrigger>
                  <SelectContent>
                     {typeShots.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>

                  </Select>
                  </FormControl>
                  <FormMessage />
               </FormItem>)}}
            ></FormField>

         <Button size='lg' disabled={isLoading} type='submit' className='w-full p-6'>{!isLoading ? `CRIAR` : <Loader/>}</Button>
           </form>
         </Form>
      </DialogHeader>
   </DialogContent>
   </Dialog>
   </>
}

export default CardShotNew