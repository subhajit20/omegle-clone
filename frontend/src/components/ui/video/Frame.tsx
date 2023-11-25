'use client'
import React,{useEffect, useRef} from 'react'
type Props = {}

const Frame = (props: Props) => {
    const ref1 = useRef<HTMLVideoElement>();
    const ref2 = useRef<HTMLVideoElement>();


    useEffect(()=>{
        const camOn = async () =>{
            let conf = {
                video: true,
                audio: true
            }
            const stream = await navigator.mediaDevices.getUserMedia(conf);
            if(ref1.current && ref2.current){
                ref1.current.srcObject = stream
                ref2.current.srcObject = stream
            }
        }
        camOn()
    },[])
  return (
    <div className='flex flex-col gap-y-5 pl-2 pt-2'>
        {/* Remote Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={ref1} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>

        {/* Local Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={ref2} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>
    </div>
  )
}

export default Frame