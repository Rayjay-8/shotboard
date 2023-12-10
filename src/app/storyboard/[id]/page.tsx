export const dynamic = "force-dynamic";

import { Titulo } from "@/components/ui/Titulo";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Shots, shots } from "@/lib/entities";
import { getShotsStory, getStoryboard } from "@/lib/queries";
import Link from "next/link";
import React from "react";

import CardShotNew from "./NovoShot";
import DeleteStory from "./DeleteStory";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DeleteShot from "./DeleteShot";
import ExportarStory from "./ExportarStory";
import EditarShot from "./EditarShot";

const CardShot = (props: Shots & { index: number; url: string }) => {
   return (
      <>
         <Card className="items-center w-[300px] h-fill bg-gray-100 grid">
            <CardHeader>
               <CardTitle>
                  <Link href={props.url}>
                     #{props.index} - {props.descricao}
                  </Link>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <CardDescription>Plano: {props.dialogo}</CardDescription>
               {/* <CardDescription>Locucao: {props.locucao}</CardDescription> */}
               {/* <CardDescription>Musica: {props.musica}</CardDescription> */}
               {/* <CardDescription>Ordem: {props.ordem}</CardDescription> */}
               <CardDescription>Segundos: {props.duracao_s}</CardDescription>
            </CardContent>
            <CardFooter className="grid gap-4 mt-auto">
               <Progress value={props.progresso} className="bg-gray-300" />
               <div className="flex justify-between gap-4">
                  {props.tipo ? (
                     <Badge variant="default">{props.tipo}</Badge>
                  ) : null}
                  <div className="flex gap-2">
                     <DeleteShot idshot={props.id_shot} />
                     <EditarShot {...props} />
                  </div>
               </div>
            </CardFooter>
         </Card>
      </>
   );
};

const page = async ({ params }: { params: { id: number } }) => {
   const algo = await getShotsStory(params.id);
   const storyboardData = await getStoryboard(params.id);
   return (
      <main className="">
         <Titulo className="bg-orange-200">
            Storyboard - {storyboardData?.data?.nome}
         </Titulo>
         <div className="flex gap-2 justify-between px-6 md:px-16 py-6">
            <h2 className="uppercase">Lista de shots</h2>
            <div className="flex gap-4">
               <ExportarStory idStoryboard={params.id} />
               <DeleteStory idStoryboard={params.id} />
            </div>
         </div>
         <div className="flex flex-wrap px-6 py-0 md:px-16 gap-4 mb-12">
            {algo?.map((e, index) => (
               <CardShot
                  key={e.id_shot}
                  url={"/storyboard/" + params.id + "/" + e.id_shot}
                  index={index + 1}
                  {...e}
               />
            ))}
            <CardShotNew forStory={params.id} />
         </div>
      </main>
   );
};

export default page;