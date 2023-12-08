import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortString = (str:string, size=20) => {
  if(!str){
    return ""
  }
  return str.slice(0,size)+"..."
}

export const typefind = (filetype) =>{
  if(filetype.includes('audio')){
    return 'audio'
  }

  if(filetype.includes('image')){
    return 'image'
  }
  if(filetype.includes('video')){
    return 'video'
  }
  return 'image'
}