import React, { ReactElement } from 'react'
import { DisplayMessage } from '../../../types/Message';

type Props = {
    message:string | ReactElement
    styles:DisplayMessage
}

const MessageCard = (props: Props) => {
    const { type, alignmentStyle, messageColor } = props.styles;
  return (
            <div className={`${alignmentStyle}`}>
                <div className={`prompt ${type} max-w-sm relative`} >
                    <div className='content'>
                        <p className={messageColor}>
                            {props.message}
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default MessageCard
