'use client'
import React from 'react'
import TopInfoBar from '../TopInfoBar'
import FunctionBar from '@/components/pageComponents/FunctionBar';
import VideoChatSection from '../VideoChatSection';
import DisplayMessages from '../DisplayMessages';
import useGeneralMethods from '@/hooks/useGeneralMethods';

interface TestVideoWrapperProps {
}

const TestVideoWrapper = (props: TestVideoWrapperProps) => {
  const {search,leave} = useGeneralMethods({
    componentType:"textMessage"
  })

  return (
    <div className='w-full h-full relative'>
        <TopInfoBar
            roomId='10023'
            connedtedWith='iuh9832'
        />
        <div className='flex w-full h-auto'>
            <VideoChatSection localStream={null} stream={null} remoteStream={null}  />
            <div className='h-[20rem] relative w-full max-w-full bg-red-300 overflow-y-scroll'>
                <DisplayMessages allMessages={[]} />
            </div>
        </div>
        <FunctionBar searchRoom={search} existRoom={leave}  />
    </div>
  )
}

export default TestVideoWrapper