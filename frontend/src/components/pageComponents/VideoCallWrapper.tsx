'use client'
import React from 'react'
import { useAppSelector } from '@/store/hook';
import ChatContainer from '../ui/container/ChatContainer';
import TopInfoBar from './TopInfoBar';
import DotCircle from '../loader/DotCircle';
import { selectUser } from '@/features/websockets/userSlice';
import VideoFuncWrapper from '../ui/container/VideoFuncWrapper';

type Props = {}

const VideoCallWrapper = (props: Props) => {
    const {userId,roomMembers,roomId} = useAppSelector(selectUser);
    
  return (
    <ChatContainer>
        <TopInfoBar
            roomId={roomId ? `RoomId - ${roomId}` : ""}
            connedtedWith={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'><DotCircle /></div>}
        />
        
        <VideoFuncWrapper />
    </ChatContainer>
  )
}

export default VideoCallWrapper