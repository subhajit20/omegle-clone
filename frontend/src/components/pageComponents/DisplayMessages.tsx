import React from 'react';
import { MesssageType } from '@/features/websockets/messageSlice';
import MessageCard from '../ui/card/MessageCard';

interface MessageProps {
    allMessages:MesssageType[]
}

const DisplayMessages :React.FC<MessageProps> = (props: MessageProps) => {
  return (
    <div className='p-2 h-[30rem] md:h-[40rem] w-full overflow-y-scroll'>
        {
            props.allMessages.length > 0 ? props.allMessages.map((msg,i)=>{
                if(msg.type === "from"){
                    return <MessageCard key={i} message={msg.message} type={"chatTextFromColor"} styles={"flex justify-start my-2"} />
                }else if(msg.type === "to"){
                    return <MessageCard key={i} message={msg.message} type={"chatTextToColor"} styles={"flex justify-end my-2"} />

                }else{
                    return null
                }
            }) : ''
        }
    </div>
  )
}

export default DisplayMessages