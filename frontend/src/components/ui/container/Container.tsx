import React from 'react'

interface ContainerInterface{
    children?:React.ReactNode
}

function Container(props:ContainerInterface) {
  return (
    <div className="flex justify-between w-full items-center py-3 px-10">
        {props.children}
    </div>
  )
}

export default Container