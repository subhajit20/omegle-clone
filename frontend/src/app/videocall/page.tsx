'use client'

import React from 'react';
import VideoPage from '@/components/pageComponents/VideoPage';
import Frame from '@/components/ui/video/Frame';
import useGeneralMethods from '@/hooks/useGeneralMethods';

const page:React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {search,leave} = useGeneralMethods({
    componentType:"videoCall"
  });
  return (
    <div className="h-[38.2rem] md:h-[49.2rem]">
        {/* column 1 Video frame */}
        {/* column 2 Message  */}
        <div className='flex justify-center h-[38.2rem] md:h-[49.2rem]'>
            <Frame />
            <VideoPage searchRoom={search} existRoom={leave} />
        </div>
    </div>
  )
}

export default page