import React from 'react';
import { MesssageType } from '@/features/websockets/messageSlice';
import MessageCard from '../ui/card/MessageCard';
import { DisplayMessage } from '../../types/Message';
import { selectMessage } from '@/features/websockets/messageSlice';
import { useAppSelector } from '@/store/hook';
import Wave from '../loader/Wave';

interface MessageProps {
    allMessages:MesssageType[]
}

const displayReceiverMessage: DisplayMessage = {
    alignmentStyle: 'flex justify-end my-2',
    type: 'success outline outline-offset-0 outline-[#52A56A]',
    messageColor: 'chatTextToColor',
}

const displaySenderMessage: DisplayMessage = {
    alignmentStyle: 'flex justify-start my-2',
    type: 'warn outline outline-offset-0 outline-[#F06612]',
    messageColor: 'chatTextFromColor',
}

const DisplayMessages :React.FC<MessageProps> = (props: MessageProps) => {
    const {typing} = useAppSelector(selectMessage);
  return (
    <div className='p-2 h-[30rem] w-full overflow-y-scroll'>
        {
            props.allMessages.length > 0 ? props.allMessages.map((msg,i)=>{
                if(msg.type === "from"){
                    return <MessageCard key={i} message={msg.message} styles={displaySenderMessage} />
                }else if(msg.type === "to"){
                    return <MessageCard key={i} message={msg.message} styles={displayReceiverMessage}/>
                }else{
                    return null
                }
            }) : ''
        }
        {
            typing && <MessageCard message={<Wave />} styles={{}} />
        }
    </div>
  )
}

export default DisplayMessages