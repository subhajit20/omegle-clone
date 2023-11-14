import React from "react";
import Modal from "antd/es/modal/Modal";

type ModalLoaderType = {
    loading?:boolean | undefined,
}

function ModalLoader(props:ModalLoaderType){
  return <Modal 
            open={props.loading}
            className="bg-transparent opacity-0"
        >
            <div className="flex justify-center">
              <div className='loader bw'>
                <div className='dot-flash' />
              </div>
            </div>
        </Modal>
}

export default ModalLoader