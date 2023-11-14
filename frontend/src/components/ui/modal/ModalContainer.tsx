import React, { useEffect } from 'react';
import Modal from 'antd/es/modal/Modal';
import Heading from '../heading/Heading';

type ModalContainerProps = {
    open?:boolean | undefined,
    streamObject?:MediaStream,
    handleOk?:()=> void,
    handleCancel?:()=> void
}

function ModalContainer(props: ModalContainerProps) {
  const videoRef = React.createRef<HTMLVideoElement>();
  const {open,streamObject} = props;

  useEffect(()=>{
    if(videoRef.current && streamObject){
      console.log(videoRef.current?.srcObject);
      console.log(streamObject);
      videoRef.current.srcObject = streamObject;
      console.log(videoRef.current?.srcObject);

    }
  },[videoRef,streamObject])
  return (
    <Modal
        open={open}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        cancelText={<button className='btn outline danger'>
          Cut
        </button>}
    >
        <Heading
          headingName={"Calling"}
          styles={"text-3xl text-center"}
        />
        <video ref={videoRef} width={1000} height={700} autoPlay playsInline muted ></video>
      </Modal>
  )
}

export default ModalContainer