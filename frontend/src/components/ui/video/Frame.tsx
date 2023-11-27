'use client'
import React,{useEffect, useRef} from 'react';
import { useAppDispatch,useAppSelector } from '@/store/hook';
import { addStream } from '@/features/websockets/videoStream';
type Props = {}

const Frame = (props: Props) => {
    const localStream = useRef<HTMLVideoElement>();
    const {stream} = useAppSelector((state) => state.videoReducer);
    const dispatch = useAppDispatch()


    useEffect(()=>{
        const camOn = async () =>{
            let conf = {
                video: true,
                audio: true
            }
            const streamInfo = await navigator.mediaDevices.getUserMedia(conf);
            if(localStream.current && stream === null){
                localStream.current.srcObject = streamInfo
                dispatch(addStream({
                    stream:streamInfo
                }))
            }
        }
        camOn()
    },[])
  return (
    <div className='flex flex-col gap-y-5 pl-2 pt-2 bg-green-400'>
        {/* Remote Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src=""  id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>

        {/* Local Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={localStream} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>
    </div>
  )
}

export default Frame