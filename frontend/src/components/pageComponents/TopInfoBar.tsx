import React, { ReactElement } from 'react';
import Heading from '../ui/heading/Heading';


interface TopInfoBarProps {
    roomId?:string | ReactElement | null;
    connedtedWith?:string | ReactElement | null
}

const TopInfoBar = (props: TopInfoBarProps) => {
  return (
    <React.Fragment>
        <div className='max-w-full py-2'>
            <Heading styles={"text-center text-xl"} headingName={props.roomId} />
            <Heading styles={"text-center text-base"} headingName={props.connedtedWith} />
        </div>
    </React.Fragment>
  )
}

export default TopInfoBar