'use client'
import React,{useState} from 'react';

const Modal:React.FC = () : any => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = (stream?:MediaStream) => {
        setOpen(false);
        console.log(stream)
        if(stream){
          stream.getTracks().forEach((track)=>{
            track.enabled = false;
          })
        }
    };
  return [
    showModal,
    handleOk,
    handleCancel,
    open,
    setOpen
  ]
}

export default Modal