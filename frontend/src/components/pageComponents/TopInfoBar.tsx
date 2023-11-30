import React from 'react';
import Heading from '../ui/heading/Heading';
import dynamic from 'next/dynamic';


interface TopInfoBarProps {
    roomId?:string;
    connedtedWith?:string
}

const TopInfoBar = (props: TopInfoBarProps) => {
  return (
    <React.Fragment>
        <div className='max-w-full py-2'>
            <Heading styles={"text-center text-xl"} headingName={`Room Id - ${props.roomId}`} />
            <Heading styles={"text-center text-base"} headingName={`Connected With - ${props.connedtedWith}`} />
        </div>
    </React.Fragment>
  )
}

export default TopInfoBar