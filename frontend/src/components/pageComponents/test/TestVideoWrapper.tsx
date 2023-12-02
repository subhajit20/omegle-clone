'use client'
import React,{useState} from 'react'
import FunctionBar from '@/components/pageComponents/FunctionBar';
import VideoChatSection from '../VideoChatSection';
import DisplayMessages from '../DisplayMessages';
import useGeneralMethods from '@/hooks/useGeneralMethods';
import ChatContainer from '@/components/ui/container/ChatContainer';
import TopInfoBar from '../TopInfoBar';
import { selectUser } from '@/features/websockets/userSlice';
import { useAppSelector } from '@/store/hook';
import DotCircle from '@/components/loader/DotCircle';


interface TestVideoWrapperProps {
}

const TestVideoWrapper = (props: TestVideoWrapperProps) => {
  const [message,setMessage] = useState<string | null>(null)
  const {roomId,roomMembers} = useAppSelector(selectUser);
  const {search,leave,sendMessage} = useGeneralMethods({
    componentType:"videoCall"
  })

  return (
    <ChatContainer>
        <TopInfoBar
            roomId={roomId ? `RoomId - ${roomId}` : ""}
            connedtedWith={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'><DotCircle /></div>}
          />
        <div className='flex w-full h-auto'>
            <VideoChatSection localStream={null} stream={null} remoteStream={null}  />
            <div className='h-[20rem] relative w-full max-w-full bg-red-300 overflow-y-scroll'>
                <DisplayMessages allMessages={[]} />
            </div>
        </div>
        <FunctionBar 
          searchRoom={search} 
          writeMsg={(e)=> setMessage(e.target.value)} 
          sendMsg={() => sendMessage(message!)} 
          existRoom={leave}  
        />
    </ChatContainer>
  )
}

export default TestVideoWrapper