import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TitleText = ({children, className}:{children: ReactNode, className?: string}) => {
  return (
    <p className={cn("font-bold text-5xl text-white", className)}>{children}</p>
  )
}

export default TitleText