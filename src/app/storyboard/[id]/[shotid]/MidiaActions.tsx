"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { Midias } from '@/lib/entities';
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { FormSchema, ShotSchema } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
 } from "@/components/ui/sheet"
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { MidiaSchema } from '@/lib/types';
import { Switch } from '@/components/ui/switch';
import { updateMidiasShot } from '@/lib/server-actions/criar-shot';

const CardMidia = (props:Midias & {onClick: ()=> null} ) => {
   const {onClick} = props
   console.log(props)
   return(<Card className='items-center w-[432px] h-[300px] bg-gray-100 ' onClick={onClick}>
   <div className='space-y-1.5 p-6 flex justify-between gap-4'>
      <CardTitle>#{props.ordem}</CardTitle>
      {props.principal === 1 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
      viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600 bg-gray-200">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
</svg> : null
}
      {/* ORDER: {props.ordem} */}
   </div>
   <CardContent>
       {props.tipo === "video" ? <video controls  className='w-[200px] h-[150px]' src={'/midias/'+props.path}></video> : null}
       {props.tipo === "image" ? <img src={'/midias/'+props.path} className='w-[400px] h-[150px]' style={{objectFit:"contain"}}/> : null}
       {props.tipo === "audio" ? <audio controls src={'/midias/'+props.path} ></audio> : null}
       
     {/* <Image alt={"Midia #"+props.id_media}   width={200} height={200} src={'/midias/'+props.path}/> */}
   </CardContent>
   <CardFooter>
     {props.comentario}
     
   </CardFooter>
   </Card>)
   }

   
const MidiaActions = ({listaMidias}:{listaMidias:Array<Midias>}) => {
   const [select, setSelect] = useState<Midias>(false)
   
   const { toast } = useToast()

   const form = useForm<z.infer<typeof MidiaSchema>>({
      mode:"onBlur",
      resolver: zodResolver(MidiaSchema),
      defaultValues: {
         comentario: "",
         principal: false,
         ordem: 0,
         tipo: undefined,
      }
   })

   const isLoading = form.formState.isSubmitting;

   const onMidiaEdit = async (data) => {

      // lembrar que tem que converte o principal para inteiro
      data.principal = data.principal ? 1 : 0
      console.log("fazer update", data)
      if(select?.id_media){
         const up = await updateMidiasShot(select.id_media, data)
         console.log("up", up)
         setSelect(false)
         toast({
            title: "Mídia Atualizada!"
         })
      }else{
         toast({
            title: "Mídia sem ID"
         })
      }
   }

   const onSelectMidia = (midia) =>{
      const cpy = {...midia}
      cpy.principal = Boolean(cpy.principal)
      console.log("cpy", cpy)
      form.reset(cpy)
      setSelect(cpy)
   }

  return (
    <>
    {listaMidias?.map(midia => <CardMidia key={midia.id_media} onClick={() => onSelectMidia(midia)} {...midia}/>)}

    <Sheet open={Boolean(select)} onOpenChange={setSelect}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent>
         <SheetHeader>
            <SheetTitle>Edição da mídia</SheetTitle>
            <SheetDescription>
               <Form {...form}>
                  <form
                  onSubmit={form.handleSubmit(onMidiaEdit)}
                  className='mt-6 w-full sm:justify-center sm:w-[330px] space-y-6 flex flex-col'
                  >

                     <FormField
                     disabled={isLoading}
                     control={form.control}
                     name='comentario'
                     render={({field}) => {return(<FormItem>
                        <FormControl>
                           <Textarea placeholder='Comentario' {...field}/>
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
                     <SelectItem value='image'>image</SelectItem>
                     <SelectItem value='video'>video</SelectItem>
                     <SelectItem value='audio'>audio</SelectItem>
                  </SelectContent>

                  </Select>
                  </FormControl>
                  <FormMessage />
               </FormItem>)}}
            ></FormField>

                  <FormField
                     disabled={isLoading}
                     control={form.control}
                     name='principal'
                     render={({field}) => {return(<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marcar como principal
                    </FormLabel>
                    <FormDescription>
                      Tornar essa a versão final!
                    </FormDescription>
                  </div>
                        <FormControl>
                           {/* <Textarea placeholder='Comentario' {...field}/> */}
                           <Switch
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           disabled={isLoading}
                           aria-readonly/>
                        </FormControl>
                        <FormMessage />
                     </FormItem>)}}
                     ></FormField>

                     <Button size='lg' disabled={isLoading} type='submit' className='w-full p-6'>{!isLoading ? `Salvar` : <Loader/>}</Button>
                  </form>
               </Form>
            </SheetDescription>
         </SheetHeader>
      </SheetContent>
      </Sheet>
    </>
  )
}

export default MidiaActions