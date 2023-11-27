'use client'
import React, { useEffect,useState } from 'react'
import Heading from '@/components/ui/heading/Heading';
import { useAppSelector,useAppDispatch } from '@/store/hook';
import { leftRoom } from '@/features/websockets/userSlice';
import { addMessages,deleteAllMessage,leftMessage } from '@/features/websockets/messageSlice';
import DisplayMessages from './DisplayMessages';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { SmileOutlined } from '@ant-design/icons';
import DotCircle from '../loader/DotCircle';

const TextPage:React.FC = () => {
    const [message,setMessage] = useState<string>()
    const { userId,roomId,roomMembers } = useAppSelector((state)=> state.userReducer);
    const { WS } = useAppSelector((state)=> state.webSocketReducer);
    const { allMessages,leftMsg } = useAppSelector((state)=> state.messageReducer);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();

    const openNotification = (placement: NotificationPlacement,message?:string) => {
        api.info({
        message:message || 'Someone just joined.Start convertation',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        placement:placement
        });
    };

    const leave = () =>{
        if(WS){
            WS.send(JSON.stringify({
                left:{
                    roomId:roomId,
                    leftUser:userId,
                    roomMembers:roomMembers
                }
            }))
            dispatch(leftRoom());
            dispatch(deleteAllMessage());
            dispatch(leftMessage({
                type:"join",
                message:"null"
            }))
        }
    }

    const search = () =>{
        if(WS){
            WS?.send(JSON.stringify({
                join:{
                    userId:userId,
                }
            }))
        }
    }

    const sendMessage = () =>{
        if(WS && userId && message){
            WS?.send(JSON.stringify({
                sendMsg:{
                    roomId:roomId,
                    from:userId,
                    to: userId === roomMembers[0] ? roomMembers[1] : roomMembers[0],
                    message:message
                }
            }))
            dispatch(addMessages({
                type:"to",
                message:message
            }))
            setMessage('');
        }
    }


    useEffect(()=>{
        if(roomMembers.length > 1){
            openNotification("topRight");
        }
    },[roomMembers])

    useEffect(()=>{
        if(leftMsg !== null){
            openNotification("topRight",leftMsg)
        }
    },[leftMsg])

  return (
        <div className='relative h-full'>
            {contextHolder}
            <div className='mt-2'>
                <Heading 
                headingName={roomId ? `Room Id - ${roomId}` : ''}
                styles={'text-center text-2xl'}
                /> 
                <Heading 
                    headingName={roomMembers.length === 0 ? "Disconnected" : roomMembers.length > 1 ? `Connected with ${userId !== roomMembers[0] ? roomMembers[0] : roomMembers[1]}` : <div className='w-full flex justify-center'><DotCircle /></div>}
                    styles={'text-center text-base'}
                /> 
            </div>
            <DisplayMessages allMessages={allMessages} />
            <div className='fixed bottom-0 flex justify-center gap-3 w-full mb-3'>
                <input disabled={roomMembers.length === 0 || roomMembers.length < 2 ? true : false} className='input outline success max-w-[20rem] md:max-w-[60rem] bg-transparent text-slate-800 '
                placeholder='Write Message'
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                />
                <button className='btn outline success' onClick={()=> sendMessage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
                <button className='btn outline info' onClick={()=> search()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                <button className='btn outline danger' onClick={()=> leave()}>
                    Exit
                </button>
            </div>
        </div>
  )
}

export default TextPage