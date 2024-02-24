import React from 'react'
import { cn } from "lib/utils"

export default function Page({className, children, ...props}) {
  return (
    <div className={cn('p-5 pt-20 sm:p-10 sm:pt-24 flex flex-col items-center min-h-screen h-full', className)} {...props}>
      {children}
    </div>
  )
}
