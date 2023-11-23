'use client'
import React,{useEffect} from "react";
import { useAppDispatch,useAppSelector } from "@/store/hook";
import {connect,disconnect} from '@/features/websockets/webSocketSlice';
import { loadUser,joinUserToRoom, leftRoom } from "@/features/websockets/userSlice";
import { addMessages } from "@/features/websockets/messageSlice";
import Link from "next/link";

type StateType = {
  peer?:RTCPeerConnection,
  stream?:MediaStream
}
export default function Home() {
  const [streamInfo,setStreamInfo] = React.useState<StateType>();
  const [loading,setLoading] = React.useState<boolean>(false);
  const {webSocketReducer,userReducer} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const {WS,connected} = webSocketReducer;
  const {userId} = userReducer;

  // const Call = async (e:React.MouseEvent<HTMLElement>) =>{
  //   showModal()
  //   setLoading(true);
  //   const conf = {
  //     video:true,
  //     audio:true
  //   }
  //   try{
  //       const stream = await navigator.mediaDevices.getUserMedia(conf);

  //       setStreamInfo((prev)=>{
  //         return {
  //           ...prev,
  //           stream:stream
  //         }
  //       });

  //     const offer = await createOfferForRemoteUser(streamInfo?.peer,stream);
  //     // console.log(sdpOffer);
  //     setLoading(false);
  //     ws?.wss?.send(JSON.stringify({
  //       offer:{
  //         from:user?.userId,
  //         to:"s",
  //         offer:offer
  //       }
  //     }))
  //   }catch(e){
  //     console.log(e);
  //     setLoading(false);
  //   }
  // }

  const joinRoom = () =>{
    WS?.send(JSON.stringify({
      join:{
        userId:userId
      }
    }))
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
  },[])

  useEffect(()=>{
    if(!WS){
      dispatch(connect({
        port:"8080"
      }))
    }
  },[])

  useEffect(()=>{
    if(WS){
      WS.onmessage = (e) =>{
        const incommingData = JSON.parse(e.data);

        if(incommingData.user){
          const {user} = incommingData;
          console.log(user);
          dispatch(loadUser({
            id:user
          }))
        }else if(incommingData.roomInfo){
          console.log(incommingData.roomInfo)
          const {roomId,members} = incommingData.roomInfo;
          dispatch(joinUserToRoom({
            id:roomId,
            members:[...members]
          }))
        }else if(incommingData.message){
          const {from,roomId,message} = incommingData.message;
          console.log(from,message);
          dispatch(addMessages({
            type:"from",
            message:message
          }))
        }
      }

    }
  },[WS])


  return (
    <main className="min-h-screen py-5">
      <div className="flex justify-center items-center gap-x-4 min-h-[40rem]">
        <Link href={'/text'} onClick={()=> joinRoom()} >
          <button  className='btn outline success w-[7rem] text-base'>
          Text
          </button>
        </Link>
        <span>or</span>
        <Link href={"/videocall"}>
          <button className='btn outline warn w-[8rem] text-base'>
            Video Call
          </button>
        </Link>
      </div>
    </main>
  )
}
