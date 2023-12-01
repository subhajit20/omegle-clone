'use client'
import React, { useEffect,useState } from 'react';
import { useAppSelector } from '@/store/hook';
import DisplayMessages from './DisplayMessages';
import TopInfoBar from './TopInfoBar';
import FunctionBar from './FunctionBar';
import useGeneralMethods from '@/hooks/useGeneralMethods';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { SmileOutlined } from '@ant-design/icons';
import DotCircle from '../loader/DotCircle';
import ChatContainer from '../ui/container/ChatContainer';

const TextPage:React.FC = () => {
    const [message,setMessage] = useState<string | null>(null)
    const { userId,roomId,roomMembers } = useAppSelector((state)=> state.userReducer);
    const { allMessages,leftMsg } = useAppSelector((state)=> state.messageReducer);
    const [api, contextHolder] = notification.useNotification();
    const {search,leave,sendMessage} = useGeneralMethods({
        componentType:"textChat",
    });

    const openNotification = (placement: NotificationPlacement,message?:string) => {
        api.info({
        message:message || 'Someone just joined.Start convertation',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        placement:placement
        });
    };

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
            <div className='w-full h-auto'>
                <DisplayMessages allMessages={allMessages} />
            </div>
            <FunctionBar 
                writeMsg={(e) => setMessage(e.target.value)}
                searchRoom={search}
                sendMsg={() => sendMessage(message!)}
                existRoom={leave}
            />
        </ChatContainer>
  )
}

export default TextPage