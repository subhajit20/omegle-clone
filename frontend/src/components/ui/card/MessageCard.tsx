import React from 'react'

type Props = {
    message:string
    styles?:string
    type?:string
}

const MessageCard = (props: Props) => {
  return (
            <div className={`${props.styles}`}>
                <div className={`prompt ${props.type} max-w-sm relative`} >
                    <div className='content'>
                        <p>
                            {props.message}
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default MessageCard