import React, { ReactElement } from 'react'

type HeadingProps = {
    headingName?:string | ReactElement | null
    styles?:string
}

const Heading:React.FunctionComponent<HeadingProps> = (props:HeadingProps) => {
  return (
    <div className={props.styles}>
        {props.headingName}
    </div>
  )
}

export default Heading