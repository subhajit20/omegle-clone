'use client'

import React, { useState,useCallback,useEffect } from 'react';
import { UserInterface } from '@/types/user';

type WssTypes = {
    wss?:WebSocket | null,
    incommingOffer?:RTCSessionDescription | null,
    connected?:boolean,
}

type WebSocketHookType = {
    ws:WssTypes | null,
    connected:boolean,
    user:UserInterface | null,
    storeUserInfo:(user:UserInterface) => void,
    setWs:React.Dispatch<React.SetStateAction<WssTypes | null>>,
}

function useWebSocket(hostname:string ):WebSocketHookType {
    const [ws,setWs] = useState<WssTypes | null>({
        wss:null,
        connected:false
    });
    const [connected,setConnection] = useState<boolean>(false);
    const [user,setUserInfo] = React.useState<UserInterface | null>(null);

    const storeUserInfo = (user:UserInterface) =>{
        setUserInfo({
                userId:user.userId,
                joinedAt:user.joinedAt,})
    }

    useEffect(()=>{
        if(ws?.wss === null && hostname){
            const ws = new WebSocket(hostname);
            setWs({
                wss:ws,
                connected:true
            })
        }
    },[hostname,ws?.wss])

  return {
    ws,
    connected,
    user,
    storeUserInfo,
    setWs
  }
}

export default useWebSocket
