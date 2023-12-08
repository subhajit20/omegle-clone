import React,{useEffect} from 'react'
import { useAppDispatch } from '@/store/hook'
import { joinUserToRoom, leftRoom, loadUser } from '@/features/websockets/userSlice';
import { addMessages, deleteAllMessage, leftMessage, setTyping, unSetTyping } from '@/features/websockets/messageSlice';


type webSocketProps = {
    type:string;
    WS:WebSocket;
}

const useWebSocketHook = (props:webSocketProps) : void => {
    const dispatch = useAppDispatch();

  useEffect(()=>{
    if(props.WS){
      props.WS.onmessage = (e) =>{
        const incommingData = JSON.parse(e.data);

        if(incommingData.user){
          const {user} = incommingData;
        //   console.log(user);
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
          dispatch(unSetTyping());
          dispatch(addMessages({
            type:"from",
            message:message
          }))
        }else if(incommingData.leave){
          console.log(incommingData.leave)
          dispatch(leftRoom());
          dispatch(deleteAllMessage());
          dispatch(leftMessage({
            type:"leave",
            message:incommingData.leave
          }))
        }else if(incommingData.typing){
          const {from} = incommingData.typing;
          console.log(from);
          dispatch(setTyping());
        }
      }

    }
  },[props.WS, dispatch])
}

export default useWebSocketHook