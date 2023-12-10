'use client';

import React, { useState } from 'react'
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
 import { createnovostoryboard } from '@/lib/server-actions/query-storyboard';
 import { useRouter } from 'next/router';
 import Loader from '@/components/Loader';
 import { useForm } from 'react-hook-form'
 import * as z from "zod"
 import {zodResolver} from "@hookform/resolvers/zod"
 import { FormSchema } from '@/lib/types'
 import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { Storyboard } from '@/lib/entities';

 const NovoStory = () => {
 
   const [open, setOpen] = useState(false)
 
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
 
   const onSubmit = async (formData:Storyboard) => {
     const da = await createnovostoryboard(formData)
     setOpen(false) 
   }
 
   return<>
   <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
     <Button>Novo Video</Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-md">
     <DialogHeader>
      <DialogTitle className='mb-8'>Criar novo StoryBoard</DialogTitle>
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
                   <Textarea placeholder='Descrição' {...field}/>
                 </FormControl>
               </FormItem>)
               }}></FormField>
 
             <Button size='lg' disabled={isLoading} type='submit' className='w-full p-6'>{!isLoading ? `CRIAR` : <Loader/>}</Button>
         </form>
       </Form>
     </DialogHeader>
   </DialogContent>
   </Dialog>
   </>
 }


export default NovoStory