import React, { useEffect } from 'react';
import Heading from '../ui/heading/Heading';
import Button from '../ui/button/Button';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/websockets/userSlice';

interface VideoPage {
    roomId?:string;
    memberId?:string;
    stream:MediaStream | null;
    writeMsg?:()=> void;
    sendMsg?:()=> void;
    searchRoom?:()=> void;
    existRoom?:()=> void;
}

const VideoPage = (props: VideoPage) => {
    const {roomMembers} = useAppSelector(selectUser);

    useEffect(()=>{
        console.log(props.stream)
    },[props.stream])

  return (
        <div className='w-full relative'>
            <div className='flex justify-center gap-3 w-full mb-3 fixed bottom-0'>
                {/* Write Message input box */}
                <input 
                    disabled={roomMembers.length === 2 ? false : true}
                    className='input outline success max-w-[20rem] md:max-w-[60rem] bg-transparent text-slate-800 '
                    placeholder='Write Message'
                    onChange={props.writeMsg}
                />

                {/* Send Message button */}
                <Button 
                    btnStyle={'btn outline success'} 
                    btnHandler={props.sendMsg} btnText={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>}
                    disable={roomMembers.length === 2 ? false : true}
                />

                {/* Search room button */}
                <Button  
                        btnText={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>} 
                        disable={roomMembers.length <= 0 ? false : true}
                        btnHandler={props.searchRoom}
                        btnStyle={'btn outline info'}
                    />
                
                {/* Exit room button */}
                <Button 
                        btnText={"Exit"} 
                        btnHandler={props.existRoom}
                        disable={roomMembers.length > 0 ? false : true}
                        btnStyle={'btn outline danger'}
                    />
                
            </div>
        </div>
  )
}

export default VideoPage