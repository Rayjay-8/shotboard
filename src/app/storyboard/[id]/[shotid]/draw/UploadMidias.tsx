"use client";
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { createMidiasShot } from '@/lib/server-actions/query-shot';
import { shortString, typefind } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const WIDTH = 1280
const EHIGHT = 720


const DrawComponent = ({saveImageURL}) => {

   const canvasRef = useRef()
   const [context, setContext ] = useState()
   const [ linewidth, setLineWidth] = useState(1)
   const [color, setColor ] = useState("#000000")
   const [isDrawing, setIsDrawing] = useState(false)


   const [comentario, setComentario] = useState("")
   const { toast } = useToast()

   useEffect(() => {

      if(canvasRef.current){
         const canvas = canvasRef.current

         const ctx = canvas.getContext('2d')
         if(window.innerWidth < WIDTH){

            canvas.width = window.innerWidth;
         }
         // canvas.height = window.innerHeight;

         ctx.rect(0, 0, WIDTH, EHIGHT);
         ctx.fillStyle = "white";
         ctx.fill();
         
         setContext(ctx)
      }

      const fncontext = e => e.preventDefault()
      window.addEventListener("contextmenu", fncontext);
      return () => window.removeEventListener("contextmenu", fncontext)
   },[])


   const onStartDraw = (e) => {
      if(context){
         context.beginPath()
         const X = e.touches?.[0].clientX ?? e.nativeEvent.offsetX
         const Y = e.touches?.[0].clientY ?? e.nativeEvent.offsetY
         
         context.moveTo(X, Y)
         setIsDrawing(true)
      }
   }
   
   const onDraw = (e) => {
      if(!isDrawing) return
      
      if(context){
         context.lineCap = 'round';
         context.strokeStyle = color
         context.lineWidth = linewidth

         const X = e.touches?.[0].clientX ?? e.nativeEvent.offsetX
         const Y = e.touches?.[0].clientY  ?? e.nativeEvent.offsetY

         context.lineTo(X, Y)
         context.stroke()
      }

   }

   const onEndDraw = (e) => {
      setIsDrawing(false)
      context?.closePath()
   }


   const clearDraw = () => {
      // const newContext = canvasRef.current.getContext('2d')
      if(context){
         context?.clearRect(0,0,WIDTH,EHIGHT)
         context.rect(0, 0, WIDTH, EHIGHT);
         context.fillStyle = "white";
         context.fill();
      }
      setComentario("")
   }

   const SalvaCanva = async () => {
      try {
         const url = canvasRef.current?.toDataURL("image/jpg");
         await saveImageURL?.(url, comentario)
         clearDraw()
         toast({
            title: "Canva salvo com sucesso!"
         })
         
      } catch (error) {
         toast({
            title: "Erro ao salvar canva!"
         })
         
      }
      // var link = document.createElement('a');
      // link.download = 'filename.png';
      // link.href = url
      // link.click();
   }


   return(<>

<div className='md:flex sm:grid gap-4 justify-between '>
      <canvas ref={canvasRef} width={WIDTH} height={EHIGHT} 
      onMouseDown={onStartDraw}
      onMouseMove={onDraw}
      onMouseUp={onEndDraw}
      onMouseOut={onEndDraw}

      onTouchStart={onStartDraw}
      onTouchEnd={onEndDraw}
      onTouchMove={onDraw}
      className='border border-black rounded-md bg-white-100'/>
      <div>
      <Label>Comentario</Label>
      <Textarea value={comentario} onChange={(e) => setComentario(e.target.value) }/>

      <h1>Story Draw</h1>
      <Link href={`/storyboard/1/5`} className='p-6'>Voltar</Link>

      <div className='mb-4 gap-4 grid'>
         <input type="color"  className=""  onChange={(e) => setColor(e.target.value)}></input>
         <input type="range"  className="" min="1" max="15" value={linewidth} onChange={(e) => setLineWidth(e.target.value)}></input>
         <label className=" ml-4 text-lg">{linewidth}Px</label>
         <Button onClick={() => clearDraw()}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>Limpar</Button>
         <Button className='bg-blue-600 hover:bg-blue-800' onClick={SalvaCanva}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
         </svg>Adicionar ao shot</Button>
         </div>
      </div>
   </div>
   </>
   )
}

const UploadMidias = ({story, shot, midias}) => {

   
   
   const { toast } = useToast()

   const [showDraw, setShowDraw ] = useState(false)
   const [uploadingmidia, setUploadingmidia ] = useState(0)

   const router = useRouter()

   const saveImageBanco = async (data, comment="") => {

      

      const tipomidia = typefind(data.type)
      const midiavinculada = await createMidiasShot({
         id_storyboard: story,
         id_shot: shot,
         principal: 0,
         path: data.path,
         tipo: tipomidia,
         ordem: (midias?.length ?? 0) + 1,
         comentario: comment,
         duracao_s: 1,
      })
      // console.log("midiavinculada", midiavinculada)
      // setbloburl("/midias/"+data.path)
      toast({
         title: "Mídia adicionada!",
         description: `${shortString(data.path)} - ${tipomidia}`
      })
            
   }
   const saveImageURL = async (url, comment='') => {

      var blobBin = atob(url.split(',')[1]);
      var array = [];
      for(var i = 0; i < blobBin.length; i++) {
         array.push(blobBin.charCodeAt(i));
      }
      // var file=new Blob([new Uint8Array(array)], {type: 'image/png'});

      const finalFile = new File([new Uint8Array(array)], new Date().toISOString()+'_canva_draw.png', {
         type: 'image/png'
      })
      
      const formData = new FormData();
      formData.append('midia', finalFile);
      formData.append('storyboard', story)
      formData.append('shot', shot)

      const { data } = await axios.post("/api/midia", formData)
      
      await saveImageBanco(data, comment)
   }
   
   const onUpload = async (prop) => {
      if(prop.target.files){
         const files = prop.target.files
         setUploadingmidia(files.length)
         // setbloburl(URL.createObjectURL(file))
         for(const file of files){
            try {
               const formData = new FormData();
               formData.append('midia', file);
               formData.append('storyboard', story)
               formData.append('shot', shot)
               const { data } = await axios.post("/api/midia", formData)
               
               await saveImageBanco(data)
               router.replace(`/storyboard/${story}/${shot}`)
               setUploadingmidia(prev => prev - 1)
            } catch (error) {
               console.log(error)
               
               toast({
                  title: "Erro ao Salvar!",
                  description: `Error: ${error}`
               })
            }
         }
      }
      setUploadingmidia(0)
   }

  return (<>

         {uploadingmidia > 0 ? "enviando... "+uploadingmidia : <div className=' grid gap-4 justify-between mb-4 md:flex'>
            {showDraw ? null : <div>
               <h2>Faça upload localmente das midias</h2>
               <input type="file" name="upload" id="upload" onChange={onUpload} multiple/>
            </div>}
            <div>
               
               {showDraw ? <DrawComponent saveImageURL={saveImageURL}/> : <>
               <div className='gap-4 flex'>
               <Button onClick={() => setShowDraw(prev => !prev)}>{"Desenhar"}</Button>
               </div>
               </>}
            </div>
         </div>}
         {showDraw ? null : <Separator />}
         </>
  )
}

export default UploadMidias