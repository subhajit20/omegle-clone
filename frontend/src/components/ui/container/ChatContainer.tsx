import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

const ChatContainer = (props: Props) => {
  return (
    <div className='w-full h-full relative'>
        {props.children}
    </div>
  )
}

export default ChatContainer