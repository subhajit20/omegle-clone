'use client';
import React from 'react';
import { addMessages,deleteAllMessage,leftMessage } from '@/features/websockets/messageSlice';
import { useAppSelector,useAppDispatch } from '@/store/hook';
import { removePeer,removeStream } from '@/features/websockets/videoStream';
import { selectUser } from '@/features/websockets/userSlice';
import { leftRoom } from '@/features/websockets/userSlice';

type GeneralMethodsTypes = {
    leave:()=> void;
    search:()=> void;
    sendMessage:(message:string)=> void;
}

interface Props{
    componentType?:string;
}

const useGeneralMethods = (props:Props):GeneralMethodsTypes => {
    const { userId,roomId,roomMembers } = useAppSelector(selectUser);
    const { WS } = useAppSelector((state)=> state.webSocketReducer);
    const dispatch = useAppDispatch();

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

            if(props.componentType === 'videoCall'){
                dispatch(removePeer());
                dispatch(removeStream());
            }
        }
    }

    const search = () =>{
        if(WS){
            WS?.send(JSON.stringify({
                join:{
                    userId:userId,
                    type:props.componentType === "videoCall" ? "videoCall" : ""
                }
            }))
        }
    }

    const sendMessage = (message:string) =>{
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
            // setMessage('');
        }
    }

    return {
        leave:leave,
        search:search,
        sendMessage:sendMessage
    }
}

export default useGeneralMethods