import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface webSocketInterface {
  WS: WebSocket | null;
  connected: boolean;
}

let WebSocketState: webSocketInterface = {
  WS: null,
  connected: false,
};

interface params {
  port: string;
}

export const webSocketSlice = createSlice({
  name: "websocket",
  initialState: WebSocketState,
  reducers: {
    connect: (state, action: PayloadAction<params>) => {
      // console.log(state.WS);
      try {
        if (state.WS === null && state.connected === false) {
          let connection = new WebSocket(
            `ws://localhost:${action.payload.port}`
          );
          console.log("connected");
          state.WS = connection;
          state.connected = true;
        } else {
          console.log(state.WS);
        }
      } catch (e) {
        state.WS = null;
        state.connected = false;
      }
    },
    disconnect: (state) => {
      state.WS = null;
      state.connected = false;
    },
  },
});

export const { connect, disconnect } = webSocketSlice.actions;
export const selectWebSocket = (state: RootState) => state.webSocketReducer;
export default webSocketSlice.reducer;
