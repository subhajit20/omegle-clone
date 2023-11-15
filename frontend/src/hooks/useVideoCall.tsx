import React, { useState } from 'react'


type CallInfo = {
    offer?:RTCSessionDescription | null,
    answer?:RTCSessionDescriptionInit | null
}

type useVideoCallType = {
    callInformation:CallInfo | null,
    createOfferForRemoteUser:(peer:RTCPeerConnection,localStream:MediaStream) => Promise<RTCSessionDescription | null>,
    createAnswerForLocalUser:(eer:RTCPeerConnection,localStream:MediaStream,remoteOffer:RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit | null>
}

function useVideoCall():useVideoCallType {
  const [callInformation,setCallInformation] = useState<CallInfo | null>(null);

  const createOfferForRemoteUser = async (peer:RTCPeerConnection,localStream:MediaStream):Promise<RTCSessionDescription | null> =>  {
    try{
        // adding localstream and track
        localStream.getTracks().forEach((track)=>{
            peer.addTrack(track,localStream)
        })

        // creating offer
        const offer = await peer.createOffer();

        // setting local description
        await peer.setLocalDescription(offer);

        // getting sdpOffer
        const sdpOffer = peer.localDescription;


        setCallInformation((prev)=>{
            return {
                ...prev,
                offer:sdpOffer
            }
        })


        return sdpOffer;
    }catch(e){
        console.log(e)
    }
    return null;
  }

  const createAnswerForLocalUser = async (peer:RTCPeerConnection,localStream:MediaStream,remoteOffer:RTCSessionDescriptionInit):Promise<RTCSessionDescriptionInit | null> => {
    try{
        // adding localstream and track
        localStream.getTracks().forEach((track)=>{
            peer.addTrack(track,localStream)
        })

        await peer.setRemoteDescription(new RTCSessionDescription(remoteOffer))

        // creating answer
        const answer = await peer.createAnswer();

        // setting local description
        await peer.setLocalDescription(answer);

        setCallInformation((prev)=>{
            return {
                ...prev,
                answer:answer
            }
        })

        return answer;
    }catch(e){
        console.log(e)
    }
    return null;
  }

  return {
    callInformation,
    createOfferForRemoteUser,
    createAnswerForLocalUser
  }
}

export default useVideoCall