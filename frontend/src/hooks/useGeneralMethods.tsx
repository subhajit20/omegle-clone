'use client';
import React from 'react'
import { addMessages,deleteAllMessage,leftMessage } from '@/features/websockets/messageSlice';
import { useAppSelector,useAppDispatch } from '@/store/hook';
import { leftRoom } from '@/features/websockets/userSlice';


type GeneralMethodsTypes = {
    leave:()=> void;
    search:()=> void
}

interface Props{
    componentType?:string;
}

const useGeneralMethods = (props:Props):GeneralMethodsTypes => {
    const { userId,roomId,roomMembers } = useAppSelector((state)=> state.userReducer);
    const { WS } = useAppSelector((state)=> state.webSocketReducer);
    const dispatch = useAppDispatch();

    const leave = () =>{
        if(WS){
            WS.send(JSON.stringify({
                left:{
                    roomId:roomId,
                    leftUser:userId,
                    roomMembers:roomMembers
                }
            }))
            dispatch(leftRoom());
            dispatch(deleteAllMessage());
            dispatch(leftMessage({
                type:"join",
                message:"null"
            }))
        }
    }

    const search = () =>{
        if(WS){
            WS?.send(JSON.stringify({
                join:{
                    userId:userId,
                    type:props.componentType === "videoCall" ? "videoCall" : ""
                }
            }))
        }
    }

    return {
        leave:leave,
        search:search
    }
}

export default useGeneralMethods