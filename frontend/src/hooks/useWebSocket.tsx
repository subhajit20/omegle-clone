'use client'
import React, { useCallback } from 'react';
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
    joinVideoCallChatRoom:(WS:WebSocket,userId:string) => void,
    openVideo:() => Promise<MediaStream | null>,
    placeCall:(WS:WebSocket,peer:RTCPeerConnection,localStream:MediaStream,userId:string,receiver:string) => void;
    receiveCall:(WS:WebSocket,peer:RTCPeerConnection,localStream:MediaStream,offer:RTCSessionDescriptionInit,caller:string,receiver:string) => void
}

function useWebSocket():WebSocketHookType {
    const dispatch = useAppDispatch();

    const joinMessageChatRoom = useCallback((WS:WebSocket,userId:string) =>{
        try{
            WS.send(JSON.stringify({
            join:{
                userId:userId,
                type:"textChat"
            }
            }))
            dispatch(leftMessage({
                type:"join",
                message:"null"
            }))
        }catch(e){
            console.log(e)
        }
    },[dispatch])

    const joinVideoCallChatRoom = useCallback((WS:WebSocket,userId:string) =>{
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
    },[dispatch])

    const placeCall = useCallback(async(WS:WebSocket,peer:RTCPeerConnection,localStream:MediaStream,userId:string,receiver:string) =>{
        try{
            console.log("Sending offer 59");
            localStream.getTracks().forEach((track)=>{
                peer.addTrack(track,localStream);
            });

            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            const sdpOffer = peer.localDescription;

            console.log("Sending offer 68");

            WS.send(JSON.stringify({
                openVideo:{
                    type:"offer",
                    info:sdpOffer,
                    caller:userId,
                    receiver:receiver
                }
            }))
        }catch(e){
            console.log(e)
        }   
    },[])

    const receiveCall = useCallback(async(WS:WebSocket,peer:RTCPeerConnection,localStream:MediaStream,offer:RTCSessionDescriptionInit,caller:string,receiver:string) =>{
        try{
            localStream.getTracks().forEach((track)=>{
                peer.addTrack(track,localStream);
            })
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            WS.send(JSON.stringify({
                openVideo:{
                    type:"answer",
                    info:answer,
                    caller:caller,
                    receiver:receiver
                }
            }))
        }catch(e){
            console.log(e)
        }   
    },[])

    const openVideo = async () : Promise<MediaStream | null> =>{
        try{
            let conf = {
                video: true,
                audio: true
            }
            const media = await navigator.mediaDevices.getUserMedia(conf);
            return media
        }catch(e){
            return null
        }
    }

    return {
        joinMessageChatRoom:joinMessageChatRoom,
        joinVideoCallChatRoom:joinVideoCallChatRoom,
        placeCall:placeCall,
        receiveCall:receiveCall,
        openVideo:openVideo
    }
}

export default useWebSocket
