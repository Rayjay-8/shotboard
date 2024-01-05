'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react'
import 'regenerator-runtime/runtime'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { api } from '../page';
import axios from 'axios';



const savaT = async (e) => {
   const {data} = await axios.post('/api/enviar', {texto: e})
   // console.((log("api.post",data)
   console.log("reseta sim", e)
   // resetTranscript()
}


async function getLocalStream() {
  const result = await navigator?.permissions?.query({ name: 'microphone' });

  if (result.state == 'granted') {
    
  } else if (result.state == 'prompt') {
  } else if (result.state == 'denied') {
    alert("negado")
  }

  navigator?.mediaDevices?
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      window.localStream = stream; // A
      window.localAudio.srcObject = stream; // B
      window.localAudio.autoplay = true; // C
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`);
    });
}

var recognition;
let recogindexcurrent = 0
const SavePalavras = ({palavrasInit}:{palavrasInit: Array<string>}) => {
  
  const [listapalavras, setLista ] = useState<Array<string>>(palavrasInit ?? [])

  const [ ouvindo, setOuvindo] = useState(false)

    useEffect(() => {
      return () => {
         recognition = null  
         recogindexcurrent = 0
      }
    }, [])

    let foi_Iniciado = useRef(false)



    const onListening = () => {


      if(foi_Iniciado.current){
        recognition?.stop()
        recognition = null  
         recogindexcurrent = 0
         foi_Iniciado.current = false
         setOuvindo(false)
        return false
      }
      // getLocalStream()
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition()
      recognition.lang = 'pt-BR'
      recognition.continuous = true
      recognition.onend = function() {
        console.log('Gravação encerrada.');
        setOuvindo(false)
     };
      recognition.onresult = (event) => {
         var transcript = event.results[recogindexcurrent][0].transcript; 
         console.log(event.results)
         recogindexcurrent += 1
         savaT(transcript)
         setLista(prev => [transcript, ...prev ])
      }

      recognition?.start()
      foi_Iniciado.current = true
      setOuvindo(true)
    }

    

  return (
    <div className='bg-black text-gray-100 p-6'>

      
      

      <Button onClick={() => onListening()} size="lg" className={ouvindo ? 'w-96 h-96' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={ouvindo ? "w-96 h-96" : "w-6 h-6"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
       </svg>
      </Button>

      <br/>

      <h3 className="text-gray-100 my-6">Lista de palavras: ({listapalavras?.length})</h3>

      {listapalavras.map((e,index) => <span className='text-gray-100' key={index}>{e} | </span>)}
    </div>
  )
}

export default SavePalavras