import React, { MouseEventHandler, ReactElement } from 'react'

type ButtonProps = {
    btnText:string | ReactElement;
    btnStyle?:string;
    disable?:boolean;
    btnHandler?:(e:React.MouseEvent<HTMLElement>) => void;
}

const Button:React.FunctionComponent<ButtonProps> = (props:ButtonProps) => {
  return (
    <button disabled={props.disable == true ? true : false} className={props.btnStyle || 'btn light success p-2 md:p-3'} onClick={props.btnHandler} >
        {props.btnText}
    </button>
  )
}

export default Button