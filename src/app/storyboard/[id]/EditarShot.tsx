"use client";
import { Shots } from "@/lib/entities";
import { ShotSchema } from "@/lib/types";
import React, { useState } from "react";

import Loader from "@/components/Loader";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editShot } from "@/lib/server-actions/query-shot";

const EditarShot = (props: Shots) => {
   const [open, setOpen] = useState(false);

   const form = useForm<z.infer<typeof ShotSchema>>({
      mode: "onChange",
      resolver: zodResolver(ShotSchema),
      defaultValues: {
         descricao: props.descricao,
         duracao_s: props.duracao_s,
         ordem: props.ordem,
         progresso: props.progresso,
      },
   });

   const isLoading = form.formState.isSubmitting;

   const onEdit = async (data) => {
      const { error } = await editShot(props.id_shot, data);
      if (error) {
      } else {
         setOpen(false);
      }
   };

   return (
      <>
         <div
            className="p-2 rounded-md bg-gray-500 text-white"
            onClick={() => setOpen(true)}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
               />
            </svg>
         </div>

         <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
               <SheetTitle>Edição da mídia</SheetTitle>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onEdit)}
                     className="mt-6 w-full sm:justify-center sm:w-[330px] space-y-6 flex flex-col"
                  >
                     <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="descricao"
                        render={({ field }) => {
                           return (
                              <FormItem>
                                 <FormLabel>Plano</FormLabel>
                                 <FormControl>
                                    <Textarea placeholder="Plano" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           );
                        }}
                     ></FormField>

                     <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="duracao_s"
                        render={({ field }) => {
                           return (
                              <FormItem>
                                 <FormLabel>Duração</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       placeholder="duracao"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           );
                        }}
                     ></FormField>

                     <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="ordem"
                        render={({ field }) => {
                           return (
                              <FormItem>
                                 <FormLabel>Ordem</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       placeholder="ordem"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           );
                        }}
                     ></FormField>

                     <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="progresso"
                        render={({ field }) => {
                           return (
                              <FormItem>
                                 <FormLabel>progresso</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       placeholder="progresso"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           );
                        }}
                     ></FormField>

                     <Button
                        size="lg"
                        disabled={isLoading}
                        type="submit"
                        className="w-full p-6"
                     >
                        {!isLoading ? `Salvar` : <Loader />}
                     </Button>
                  </form>
               </Form>
            </SheetContent>
         </Sheet>
      </>
   );
};

export default EditarShot;
