import React from 'react';
import VideoCallWrapper from '@/components/pageComponents/VideoCallWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Chat',
  description: 'This is Video call page',
}

const page:React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <VideoCallWrapper />
    </div>
  )
}

export default page