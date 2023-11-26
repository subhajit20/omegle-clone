'use client'
import React from 'react';
import { UserInterface } from '@/types/user';
import { useAppDispatch } from '@/store/hook';
import { leftMessage } from '@/features/websockets/messageSlice';

// type WssTypes = {
//     wss?:WebSocket | null,
//     incommingOffer?:RTCSessionDescription | null,
//     connected?:boolean,
// }

type WebSocketHookType = {
    joinMessageChatRoom:(WS:WebSocket,userId:string) => void,
    joinVideoCallChatRoom:(WS:WebSocket,userId:string) => void
}

function useWebSocket():WebSocketHookType {
    const dispatch = useAppDispatch();


    const joinMessageChatRoom = (WS:WebSocket,userId:string) =>{
        try{
            WS.send(JSON.stringify({
            join:{
                userId:userId,
                type:"text"
            }
            }))
            dispatch(leftMessage({
                type:"join",
                message:"null"
            }))
        }catch(e){
            console.log(e)
        }
    }

    const joinVideoCallChatRoom = (WS:WebSocket,userId:string) =>{
        try{
            WS.send(JSON.stringify({
            join:{
                    userId:userId,
                    type:"videoCall"
                }
            }))
            dispatch(leftMessage({
                type:"join",
                message:"null"
            }))
        }catch(e){
            console.log(e)
        }
    }

    return {
        joinMessageChatRoom:joinMessageChatRoom,
        joinVideoCallChatRoom:joinVideoCallChatRoom
    }
}

export default useWebSocket
