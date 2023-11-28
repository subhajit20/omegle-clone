import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface VideoInterface {
  stream: MediaStream | null;
  peer: RTCPeerConnection | null;
}

interface PayloadInterface {
  stream: MediaStream;
}

let VideoState: VideoInterface = {
  stream: null,
  peer: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState: VideoState,
  reducers: {
    addPeer: (state, action) => {
      state.peer = action.payload.peer;
    },
    removePeer: (state) => {
      state.peer = null;
    },
    addStream: (state, action: PayloadAction<PayloadInterface>) => {
      state.stream = action.payload.stream;
    },
    removeStream: (state) => {
      state.stream = null;
    },
  },
});

export const { addPeer, removePeer, addStream, removeStream } =
  videoSlice.actions;
export const selectVideoStream = (state: RootState) => state.videoReducer;
export default videoSlice.reducer;
