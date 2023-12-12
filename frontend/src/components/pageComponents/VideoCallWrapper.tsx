'use client'
import React,{useEffect} from 'react'
import { useAppSelector } from '@/store/hook';
import ChatContainer from '../ui/container/ChatContainer';
import TopInfoBar from './TopInfoBar';
import DotCircle from '../loader/DotCircle';
import { selectUser } from '@/features/websockets/userSlice';
import VideoFuncWrapper from '../ui/container/VideoFuncWrapper';
import useNotificationHook from '@/hooks/useNotificationHook';
import { selectMessage } from '@/features/websockets/messageSlice';

type Props = {}

const VideoCallWrapper = (props: Props) => {
    const {userId,roomMembers,roomId} = useAppSelector(selectUser);
    const { leftMsg } = useAppSelector(selectMessage);
    const {
        openNotification,
        contextHolder
    } = useNotificationHook()
    

    useEffect(()=>{
        if(roomMembers.length === 2){
            openNotification("topRight");
        }
    },[roomMembers])

    useEffect(()=>{
        if(leftMsg !== null){
            openNotification("topRight",leftMsg)
        }
    },[leftMsg])
  return (
    <ChatContainer>
      {contextHolder}
        <TopInfoBar
            roomId={roomId ? `RoomId - ${roomId}` : ""}
            connedtedWith={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'><DotCircle /></div>}
        />
        
        <VideoFuncWrapper />
    </ChatContainer>
  )
}

export default VideoCallWrapper