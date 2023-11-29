import React from 'react';
import Frame from '../ui/video/Frame';

interface VideoChatSectionProps {
  stream:MediaProvider | null;
  localStream:MediaStream | null;
  remoteStream:MediaStream | null;
}

const VideoChatSection = (props: VideoChatSectionProps) => {
  return (
    <React.Fragment>
        <div className='max-w-full h-[45rem]'>
            <Frame stream={props.stream} localStream={props.localStream} remoteStream={props.remoteStream} />
        </div>
    </React.Fragment>
  )
}

export default VideoChatSection