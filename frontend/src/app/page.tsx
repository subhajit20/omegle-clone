'use client'
import React,{useEffect} from "react";
import Contact from "@/components/ui/contacts/Contact";
import ModalContainer from "@/components/ui/modal/ModalContainer";
import ModalLoader from "@/components/ui/modal/ModalLoader";
import Modal from "@/components/ui/modal/Modal";
import Heading from "@/components/ui/heading/Heading";
import useVideoCall from "@/hooks/useVideoCall";
import useWebSocket from "@/hooks/useWebSocket";
import { Badge } from "antd";

type StateType = {
  peer?:RTCPeerConnection,
  stream?:MediaStream
}
export default function Home() {
  const [streamInfo,setStreamInfo] = React.useState<StateType>();
  const [loading,setLoading] = React.useState<boolean>(false);
  
  const [
    showModal,
    handleOk,
    handleCancel,
    open,
   ] = Modal();

   let hostname = "ws://localhost:8080";
   const {
    callInformation,
    createOfferForRemoteUser
   } = useVideoCall();
   const {
    ws,
    user,
    storeUserInfo,
    setWs
   } = useWebSocket(hostname);

  const Call = async (e:React.MouseEvent<HTMLElement>) =>{
    showModal()
    setLoading(true);
    const conf = {
      video:true,
      audio:true
    }
    try{
        const stream = await navigator.mediaDevices.getUserMedia(conf);

        setStreamInfo((prev)=>{
          return {
            ...prev,
            stream:stream
          }
        });

      await createOfferForRemoteUser(streamInfo?.peer,stream);
      // console.log(sdpOffer);
      setLoading(false);
    }catch(e){
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(!streamInfo?.peer){
       const iceServers = [
           { urls: 'stun:stun.l.google.com:19302' },
       ];
      const configuration = { iceServers };

      const peer = new RTCPeerConnection(configuration);
       setStreamInfo((prev)=>{
        return {
          ...prev,
          peer:peer
        }
      });
    }
  },[streamInfo])

  
  useEffect(()=>{
    if(ws?.wss){
      const {wss} = ws;

      wss.onmessage = (e) =>{
        const data = JSON.parse(e.data);

        if(data.user){
          console.log(data.user)
          storeUserInfo(data.user);
        }
      }

      wss.onerror = (e) =>{
        console.log(e)
        setWs({
          wss:null,
          connected:false
        })
      }
    }


    return ()=>{
      if(ws?.wss){
        ws?.wss.close()
      }
    }
  },[ws])


  return (
    <main className="min-h-screen py-5">
      {
        streamInfo?.stream && !loading ? <ModalContainer 
        open={open} 
        handleOk={handleOk} 
        handleCancel={() => handleCancel(streamInfo.stream)} 
        streamObject={streamInfo?.stream}
        /> : ''
      }
      <ModalLoader loading={loading} />
      <div className="flex justify-center gap-x-5 items-center">
        <Heading
        headingName={'My Contact'}
        styles={"text-3xl text-center"}
       />
      <Badge status={ws?.connected === true ? "success" : "error"} className="scale-[2]" />
      </div>
      <Modal />
      <Contact contactName="Subhajit Ghosh" btnHandler={(e)=> Call(e)} />
      <Contact contactName="Badal Ghosh" btnHandler={(e)=> Call(e)} />
      <Contact contactName="Sujata Ghosh" btnHandler={(e)=> Call(e)} />
      <button className='btn outline danger'>
        Close
      </button>
    </main>
  )
}
