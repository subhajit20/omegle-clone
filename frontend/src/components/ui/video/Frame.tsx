'use client'
import React,{useEffect, useRef} from 'react';
import { useAppDispatch,useAppSelector } from '@/store/hook';
import { addPeer, addStream } from '@/features/websockets/videoStream';
import useWebSocket from '@/hooks/useWebSocket';
type Props = {}

const Frame = (props: Props) => {
    const {videoReducer,webSocketReducer,userReducer} = useAppSelector((state) => state);
    const {placeCall} = useWebSocket();
    const dispatch = useAppDispatch()
    const {stream,peer} = videoReducer;
    const {WS} = webSocketReducer;
    const {userId,roomMembers} = userReducer;
    const localVideoId = document.getElementById("localVideo") as HTMLVideoElement;


    useEffect(()=>{
        const camOn = async () =>{
            let conf = {
                video: true,
                audio: true
            }
            if(peer === null){
                const iceServers = [
                    { urls: 'stun:stun.l.google.com:19302' },
                ];
                const configuration = { iceServers };
                dispatch(addPeer({
                    peer:new RTCPeerConnection(configuration)
                }))
            }
            if(stream === null){
                    const streamInfo = await navigator.mediaDevices.getUserMedia(conf);
                    dispatch(addStream({
                        stream:streamInfo
                    }))
            }
        }
        camOn()
    },[dispatch, stream,peer])

    useEffect(()=>{
        if(stream !== null){
            localVideoId.srcObject = stream;
        }
    },[localVideoId, stream])

    useEffect(()=>{
        if(WS){
            WS.onmessage = (e) =>{
                const data = JSON.parse(e.data);
                if(data.roomInfo){
                    console.log(data.roomInfo)
                    const {option,members} = data.roomInfo
                    if(option === 'connected' && roomMembers.length > 0 && members.length > 0){
                        console.log(userId)
                        let caller = userId === members[0] ? userId : members[1];
                        let receiver = userId !== members[0] ? members[0] : members[1];
                        console.log(caller);
                        console.log(receiver);
                        console.log(roomMembers);
                        if(peer && stream){
                            placeCall(
                                WS!,
                                peer,
                                stream,
                                caller,
                                receiver
                            )
                        }
                    }
                }else if(data.calling){
                    console.log(data.calling)
                    // if(userId === roomMembers[1]){
                    //     WS.send(JSON.stringify({
                    //         type:"answer",
                    //         info:"Answerrrrr",
                    //         receiver:userId,
                    //         caller:data.calling.from
                    //     }))
                    // }
                }else if(data.accepted){
                        console.log("Accepted .....")
                }
            }
            
        }
    },[WS, peer, placeCall, roomMembers, stream, userId])
  return (
    <div className='flex flex-col gap-y-5 pl-2 pt-2 bg-green-400'>
        {/* Remote Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src=""  id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>

        {/* Local Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            {
                stream === null ? "Loading" : <video src="" id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
            }
        </div>
    </div>
  )
}

export default Frame