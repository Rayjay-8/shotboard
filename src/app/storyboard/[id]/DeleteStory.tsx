'use client';

import { Button } from '@/components/ui/button'
import { deleteStoryboard } from '@/lib/server-actions/query-storyboard';
import { useRouter } from 'next/navigation';
import React from 'react'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"

const DeleteStory = ({idStoryboard}:{idStoryboard:number}) => {

   const router = useRouter()

   const deleteStory = async () => {
      const ret = await deleteStoryboard(idStoryboard)
      router.replace('/')
   }

  return (
    <>
    <AlertDialog>
   <AlertDialogTrigger>
   <Button >Apagar storyboard #{idStoryboard}</Button>

   </AlertDialogTrigger>
   <AlertDialogContent>
      <AlertDialogHeader>
         <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
         <AlertDialogDescription>
         Essa ação não poderá ser desfeita. Isso irá permanentemente apagar seu storyboard/shots/midias.
         </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
         <AlertDialogCancel>Cancelar</AlertDialogCancel>
         <AlertDialogAction className='bg-red-500' onClick={deleteStory} >Remover</AlertDialogAction>
      </AlertDialogFooter>
   </AlertDialogContent>
   </AlertDialog>
    
    </>
  )
}

export default DeleteStory