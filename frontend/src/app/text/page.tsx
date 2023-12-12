import React from 'react';
// import TextPage from '@/components/pageComponents/TextPage';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
const TextPage = dynamic(()=> import("@/components/pageComponents/TextPage"));

export const metadata: Metadata = {
  title: 'Text Chat',
  description: 'This is Video call page',
}

const page = () => {

  return (
    <main className="h-screen">
        <TextPage />
    </main>
  )
}

export default page