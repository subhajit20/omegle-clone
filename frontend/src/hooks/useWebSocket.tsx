import React, { useState } from 'react'

type WssTypes = {
    wss?:WebSocket | null,
    incommingOffer?:RTCSessionDescription | null,
    connected?:boolean | null
}

function useWebSocket():any {
    const [ws,setWs] = useState<WssTypes | null>(null);


  const initWebSocket = (hostName:string) =>{
    try{
        const ws = new WebSocket(hostName);

        setWs((prev)=>{
            return {
                ...prev,
                wss:ws,
                connected:true
            }
        })
    }catch(e){
        console.log(e)
    }
  }

  const getOffer = (ws?:WebSocket) =>{
    try{
        ws!.onmessage = (e) =>{
            console.log(JSON.parse(e.data));
        }
    }catch(e){
        console.log(e)
    }
  }

  return {
    ws,
    initWebSocket,
    getOffer
  }
}

export default useWebSocket