import clsx from "clsx"

export const Titulo = ({children, className}) => {
   return(<>
     <div className={clsx('text-4xl font-bold tracking-wide  w-full p-16', className)}>{children}</div>
   </>)
 }