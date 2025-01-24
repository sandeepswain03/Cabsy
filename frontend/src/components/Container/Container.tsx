import React from 'react'

function Container({ children, className }: { children: React.ReactNode,className?:string }) {
  return (
    <div className={`max-w-[722px] mx-auto px-[16px]  ${className}`}>{children}</div>
  )
}

export default Container