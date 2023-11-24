import React from 'react';
import VideoPage from '@/components/pageComponents/VideoPage';
import Frame from '@/components/ui/video/Frame';

const page:React.FC = () => {
  return (
    <div className="h-[38.2rem] md:h-[49.2rem]">
        {/* column 1 Video frame */}
        {/* column 2 Message  */}
        <div className='flex justify-center h-[38.2rem] md:h-[49.2rem]'>
            <Frame />
            <VideoPage />
        </div>
    </div>
  )
}

export default page