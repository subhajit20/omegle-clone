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
import ChatContainer from '../ui/container/ChatContainer';
import { selectWebSocket } from '@/features/websockets/webSocketSlice';
import { selectMessage } from '@/features/websockets/messageSlice';
import { clearTimeout } from 'timers';
import { selectUser } from '@/features/websockets/userSlice';
import useWebSocketHook from '@/hooks/useWebSocketHook';
import useNotificationHook from '@/hooks/useNotificationHook';

const TextPage:React.FC = () => {
    const [message,setMessage] = useState<string | null>(null)
    const { userId,roomId,roomMembers } = useAppSelector(selectUser);
    const { allMessages,leftMsg, typing } = useAppSelector(selectMessage);
    const {WS} = useAppSelector(selectWebSocket);
    const {
        openNotification,
        contextHolder
    } = useNotificationHook()
    const {search,leave,sendMessage} = useGeneralMethods({
        componentType:"textChat",
    });
    useWebSocketHook({
        type:"textChat",
        WS:WS!
    })

    const writtingMessage = (delay:number) =>{
        let timerId:any;
        return (e:any) => {
            clearTimeout(timerId);
            timerId = setTimeout(()=>{
                setMessage(e.target.value)
                if(WS){
                    WS.send(JSON.stringify({
                        typing:{
                            from:userId,
                            to:userId === roomMembers[0] ? roomMembers[1] : roomMembers[0]
                        }
                    }))
                }
            },delay)

        }
    }

    let lazyWrite = writtingMessage(2000);

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
                connedtedWith={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'>Wait a moment...Searching stranger</div>}
            />
            <div className='w-full h-auto'>
                <DisplayMessages allMessages={allMessages} />
            </div>
            <FunctionBar 
                writeMsg={(e) => lazyWrite(e)}
                searchRoom={search}
                sendMsg={() => sendMessage(message!)}
                existRoom={leave}
            />
        </ChatContainer>
  )
}

export default TextPage