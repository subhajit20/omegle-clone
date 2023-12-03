'use client'

import React from 'react'
import Frame from '@/components/ui/video/Frame';
import useGeneralMethods from '@/hooks/useGeneralMethods';
import { useAppSelector } from '@/store/hook';
import ChatContainer from '../ui/container/ChatContainer';
import TopInfoBar from './TopInfoBar';
import DotCircle from '../loader/DotCircle';
import DisplayMessages from './DisplayMessages';
import { selectMessage } from '@/features/websockets/messageSlice';
import FunctionBar from './FunctionBar';
import useVideoChat from '@/hooks/useVideoChat';

type Props = {}

const VideoCallWrapper = (props: Props) => {
    // const {userId,roomMembers,roomId} = useAppSelector(selectUser);
    const {
        mediaProvider,
        streams,
        roomMembers,
        roomId,
        userId,
        message,
        setMessage
    } = useVideoChat({});
    const {search,leave,sendMessage} = useGeneralMethods({
        componentType:"videoCall"
    });
    const {allMessages} = useAppSelector(selectMessage)

  return (
    <ChatContainer>
        <TopInfoBar
            roomId={roomId ? `RoomId - ${roomId}` : ""}
            connedtedWith={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'><DotCircle /></div>}
        />
        <div className='flex justify-center w-full h-auto'>
            <Frame stream={roomMembers.length === 2 ? mediaProvider : null} remoteStream={roomMembers.length === 2 ? streams.remoteStream : null} />
            <DisplayMessages allMessages={allMessages} />
        </div>
        <FunctionBar 
            searchRoom={search}
            existRoom={leave}
            writeMsg={(e)=> setMessage(e.target.value)}
            sendMsg={()=> sendMessage(message!)}
        />
    </ChatContainer>
  )
}

export default VideoCallWrapper