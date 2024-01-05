import { getPalavrasDoDia } from "@/lib/queries"
import SavePalavras from "./SavePalavras"
import 'regenerator-runtime/runtime'

const page = async () => {
   const palavrasHoje = await getPalavrasDoDia()
   
   return(<SavePalavras palavrasInit={palavrasHoje?.map(e => e.palavra)}/>)
}

export default page