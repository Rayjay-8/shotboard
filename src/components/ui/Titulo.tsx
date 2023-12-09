import clsx from "clsx"
import Link from "next/link"

export const Titulo = ({children, className}) => {
   return(<>
   <Link href="/">
     <div className={clsx('text-4xl font-bold tracking-wide  w-full p-6 md:p-16', className)}>{children}</div>
     </Link>
   </>)
 }