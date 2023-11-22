'use client'
import React, { useEffect } from 'react'
import Heading from '@/components/ui/heading/Heading';
import { useAppSelector } from '@/store/hook';

const TextPage:React.FC = () => {
    const { roomId,roomMembers } = useAppSelector((state)=> state.userReducer);

    useEffect(()=>{
        console.log(roomMembers)
    },[roomMembers])
  return (
        <section>
                <Heading 
                    headingName={roomId ? `Room Id - ${roomId}` : ''}
                    styles={'text-center text-2xl'}
                /> 
            <div className='fixed bottom-0 flex justify-center gap-3 w-full mb-3'>
                <input className='input outline success max-w-[30rem] md:max-w-[60rem] bg-transparent text-slate-800 '
                placeholder='Write Message' />
                <button className='btn outline success' onClick={()=> console.log(roomMembers)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
                <button className='btn outline info'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                <button className='btn outline danger'>
                Exit
                </button>
            </div>
        </section>
  )
}

export default TextPage