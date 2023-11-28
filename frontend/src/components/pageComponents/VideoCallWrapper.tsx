'use client'

import React, { useEffect,useState } from 'react'
import VideoPage from '@/components/pageComponents/VideoPage';
import Frame from '@/components/ui/video/Frame';
import useGeneralMethods from '@/hooks/useGeneralMethods';
import { selectVideoStream } from '@/features/websockets/videoStream';
import { selectWebSocket } from '@/features/websockets/webSocketSlice';
import { selectUser } from '@/features/websockets/userSlice';
import { useAppSelector } from '@/store/hook';
import { useAppDispatch } from '@/store/hook';
import { joinUserToRoom } from '@/features/websockets/userSlice';
import useWebSocket from '@/hooks/useWebSocket';
import { addMessages } from '@/features/websockets/messageSlice';

type Props = {}

const VideoCallWrapper = (props: Props) => {
    const [mediaProvider,setMedia] = useState<MediaProvider | null>(null)
    const {search,leave} = useGeneralMethods({
        componentType:"videoCall"
    });
    const {placeCall,openVideo} = useWebSocket();
    const {stream} = useAppSelector(selectVideoStream);
    const {WS} = useAppSelector(selectWebSocket);
    const {userId,roomMembers} = useAppSelector(selectUser);
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(WS){
            WS.onmessage = (e) =>{
                const incommingData = JSON.parse(e.data);

                if(incommingData.roomInfo){
                    console.log("From video page",incommingData.roomInfo);
                    const {roomId,members,option} = incommingData.roomInfo;
                    dispatch(joinUserToRoom({
                        id:roomId,
                        members:[...members]
                    }))

                    if(option === "connected" && userId === roomMembers[0]){
                        // create peer
                        // create stream
                        // open video
                        // placeCall()
                        openVideo()
                            .then((data)=>{
                                console.log(data);
                                setMedia(data);
                            })
                    }
                }else if(incommingData.message){
                    const {from,roomId,message} = incommingData.message;
                    console.log(from,message);
                    dispatch(addMessages({
                        type:"from",
                        message:message
                    }))
                }else if(incommingData.leave){
                    console.log(incommingData.leave);
                    setMedia(null);
                    // console.log(incommingData.leave)
                    // dispatch(leftRoom());
                    // dispatch(deleteAllMessage());
                    // dispatch(leftMessage({
                    //     type:"leave",
                    //     message:incommingData.leave
                    // }))
                }
            }
        }
    },[WS, dispatch, openVideo, roomMembers, userId])

    useEffect(()=>{
        console.log(roomMembers)
    },[roomMembers])
  return (
    <div className='flex justify-center h-[38.2rem] md:h-[49.2rem]'>
        <Frame stream={roomMembers.length === 2 ? mediaProvider : null} />
        <VideoPage stream={stream} searchRoom={search} existRoom={leave} />
    </div>
  )
}

export default VideoCallWrapper