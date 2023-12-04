'use client'
import React,{useEffect} from "react";
import { useAppDispatch,useAppSelector } from "@/store/hook";
import {connect} from '@/features/websockets/webSocketSlice';
import useWebSocket from "@/hooks/useWebSocket";
import Link from "next/link";
import useWebSocketHook from "@/hooks/useWebSocketHook";
import DotCircle from "../loader/DotCircle";
import Button from "../ui/button/Button";
import { VideoCallIcon } from "../../icons/externalIcons";

export default function HomePage() {
  const {joinMessageChatRoom,joinVideoCallChatRoom} = useWebSocket()
  const {webSocketReducer,userReducer} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const {WS} = webSocketReducer;
  useWebSocketHook({
    type:"textChat",
    WS:WS!
  });
  const {userId} = userReducer;


  useEffect(()=>{
    if(!WS){
      dispatch(connect({
        port:"8080"
      }))
    }
  },[WS, dispatch])

  useEffect(()=>{
    console.log("My user id ---> ",userId)
  },[userId])

  return (
    <React.Fragment>
        {
          userId === null && <div className="h-auto flex justify-center items-center"><DotCircle /></div>
        }
      {
        userId !== null && <div className="flex justify-center items-center gap-x-4 min-h-[40rem]">
        <Link href={'/text'} onClick={()=> joinMessageChatRoom(WS!,userId!)} >
          <Button btnText={"Text"}  btnStyle='btn outline success w-[7rem] text-base' />
        </Link>
        <span>or</span>
        <Link href={"/videocall"} onClick={()=> joinVideoCallChatRoom(WS!,userId!)}>
          <Button btnText={<VideoCallIcon />} btnStyle='btn outline warn w-[8rem] text-base' />
        </Link>
      </div>
      }
    </React.Fragment>
  )
}
