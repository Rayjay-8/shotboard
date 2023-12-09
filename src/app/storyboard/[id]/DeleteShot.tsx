'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import { deleteShot } from '@/lib/server-actions/query-shot';
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


const DeleteShot = ({idshot}:{idshot:number}) => {

   const ondelete = async () => {
      const ret = await deleteShot(idshot)
      console.log(ret)
   }
  return (<>
   <AlertDialog>
   <AlertDialogTrigger>
   <div className='bg-red-600 p-2 rounded-md text-white'>Apagar</div>

   </AlertDialogTrigger>
   <AlertDialogContent>
      <AlertDialogHeader>
         <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
         <AlertDialogDescription>
         Essa ação não poderá ser desfeita. Isso irá permanentemente apagar seus shots/midias.
         </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
         <AlertDialogCancel>Cancelar</AlertDialogCancel>
         <AlertDialogAction className='bg-red-500' onClick={ondelete} >Remover</AlertDialogAction>
      </AlertDialogFooter>
   </AlertDialogContent>
   </AlertDialog>
   </>
  )
}

export default DeleteShot