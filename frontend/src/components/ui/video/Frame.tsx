'use client'
import React,{useEffect, useRef} from 'react';


type Props = {
    stream:MediaProvider | null
}

const Frame = (props: Props) => {
    const localVideo = useRef<HTMLVideoElement>()

    useEffect(()=>{
        if(props.stream !== null){
            if(localVideo.current){
                localVideo.current.srcObject = props.stream;
            }
        }else{
            console.log(props.stream);
            if(localVideo.current){
                localVideo.current.srcObject = props.stream;
            }
        }
    },[props.stream])
  return (
    <div className='flex flex-col gap-y-5 pl-2 pt-2 bg-green-400'>
        {/* Remote Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src=""  id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>

        {/* Local Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={localVideo} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>
    </div>
  )
}

export default Frame