import React from 'react';
// import TextPage from '@/components/pageComponents/TextPage';
import dynamic from 'next/dynamic';
const TextPage = dynamic(()=> import("@/components/pageComponents/TextPage"))

const page = () => {

  return (
    <main className="h-screen">
        <TextPage />
    </main>
  )
}

export default page