import React, { useState,useCallback } from 'react'

type WssTypes = {
    wss?:WebSocket | null,
    incommingOffer?:RTCSessionDescription | null,
    connected?:boolean
}

type WebSocketHookType = {
    ws:WssTypes | null,
    connected:boolean,
    initWebSocket:(hostName:string)=> void,
    getOffer:(ws:WebSocket) => void,
    closeConnection:(ws:WebSocket) => void
}

function useWebSocket():WebSocketHookType {
    const [ws,setWs] = useState<WssTypes | null>(null);
    const [connected,setConnection] = useState<boolean>(false);

    const initWebSocket = useCallback((hostName:string):void =>{
        try{
            if(ws?.wss === null || ws?.wss === undefined){
                const ws = new WebSocket(hostName);
                setConnection(true);
                setWs((prev)=>{
                    return {
                        ...prev,
                        wss:ws,
                        connected:true
                    }
                })
            }
        }catch(e){
            console.log(e);
            setConnection(false);
            setWs((prev)=>{
                    return {
                        ...prev,
                        wss:null,
                        connected:false
                    }
                })
        }
    },[ws?.wss])

    const getOffer = (ws:WebSocket):void =>{
        try{
            if(!ws){
                throw "No connection"
            }
            ws!.onmessage = (e) =>{
                console.log(JSON.parse(e.data));
            }
        }catch(e){
            console.log(e)
        }
    }

    const closeConnection = (ws:WebSocket) =>{
        try{
            if(!ws){
                throw "No connection"
            }
            ws!.onclose = () =>{
                setConnection(false);
            }
        }catch(e){
            console.log(e)
        }
    }

  return {
    ws,
    connected,
    initWebSocket,
    getOffer,
    closeConnection
  }
}

export default useWebSocket