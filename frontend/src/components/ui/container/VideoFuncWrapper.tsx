import DisplayMessages from '@/components/pageComponents/DisplayMessages'
import React from 'react'
import Frame from '../video/Frame'
import FunctionBar from '@/components/pageComponents/FunctionBar'
import useGeneralMethods from '@/hooks/useGeneralMethods'
import useVideoChat from '@/hooks/useVideoChat'
import { selectMessage } from '@/features/websockets/messageSlice'
import { useAppSelector } from '@/store/hook'

type Props = {}

const VideoFuncWrapper = (props: Props) => {
    const {
        mediaProvider,
        streams,
        message,
        setMessage,
        roomMembers,
    } = useVideoChat({});
    const {search,leave,sendMessage} = useGeneralMethods({
        componentType:"videoCall"
    });

    const {allMessages} = useAppSelector(selectMessage)
  return (
    <React.Fragment>
        <div className='flex justify-center w-full h-auto'>
            <Frame localStream={roomMembers.length === 2 ? mediaProvider ? mediaProvider : "Loading..." : null} remoteStream={roomMembers.length === 2 ? streams.remoteStream ? streams.remoteStream : "Loading..." : null} />
            <DisplayMessages allMessages={allMessages} />
        </div>
        <FunctionBar 
            searchRoom={search}
            existRoom={leave}
            writeMsg={(e)=> setMessage(e.target.value)}
            sendMsg={()=> sendMessage(message!)}
        />
    </React.Fragment>
  )
}

export default VideoFuncWrapper