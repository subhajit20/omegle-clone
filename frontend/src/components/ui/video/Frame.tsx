import React,{useEffect, useRef} from 'react';

type Props = {
    stream:MediaProvider | null;
    localStream?:MediaProvider | null;
    remoteStream:MediaProvider | null;
}

const Frame = (props: Props) => {
    const localVideo = useRef<HTMLVideoElement>();
    const remoteVideo = useRef<HTMLVideoElement>();

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

    useEffect(()=>{
        if(props.remoteStream !== null){
            if(remoteVideo.current){
                remoteVideo.current.srcObject = props.remoteStream;
            }
        }else{
            console.log(props.remoteStream);
            if(remoteVideo.current){
                remoteVideo.current.srcObject = props.remoteStream;
            }
        }
    },[props.remoteStream])
  return (
    <div className='flex flex-col gap-y-5 pl-2 pt-2 '>
        {/* Remote Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={remoteVideo} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>

        {/* Local Frame */}
        <div className="w-56 rounded-md h-36 p-2">
            <video src="" ref={localVideo} id="localVideo" width="600" height="300" className="object-fit-cover rounded-lg" autoPlay playsInline></video>
        </div>
    </div>
  )
}

export default Frame