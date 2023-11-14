/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

type AvatarProps<T> = {
    link?:T,
    name?:string
}

const Avatar:React.FunctionComponent<AvatarProps<string>> = (props:AvatarProps<string>) => {
  return (
    <div className='flex gap-x-5 justify-center items-center'>
      <div className='avatar'>
        <img alt='avatar' src={props.link ? props.link : 'https://picsum.photos/id/64/200/200'} />
      </div>
      <p>{props.name}</p>
    </div>
  )
}

export default Avatar