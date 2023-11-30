import React from 'react';
import VideoCallWrapper from '@/components/pageComponents/VideoCallWrapper';
import TestVideoWrapper from '@/components/pageComponents/test/TestVideoWrapper';


const page:React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* <VideoCallWrapper /> */}
      <TestVideoWrapper />
    </div>
  )
}

export default page