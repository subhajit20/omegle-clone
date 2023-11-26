import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MesssageType {
  type: string;
  message: string;
}

interface MessageInterface {
  allMessages: MesssageType[];
  leftMsg: string | null;
}

interface MessagePayload {
  type: string;
  message: string;
}

const messageState: MessageInterface = {
  allMessages: [],
  leftMsg: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState: messageState,
  reducers: {
    addMessages: (state, action: PayloadAction<MessagePayload>) => {
      state.allMessages = [
        ...state.allMessages,
        {
          type: action.payload.type,
          message: action.payload.message,
        },
      ];
    },
    deleteAllMessage: (state) => {
      state.allMessages = [];
    },
    leftMessage: (state, action: PayloadAction<MessagePayload>) => {
      state.allMessages = [];
      if (action.payload.type === "leave") {
        state.leftMsg = action.payload.message;
      } else if (action.payload.type === "join") {
        state.leftMsg = null;
      }
    },
  },
});

export const { addMessages, deleteAllMessage, leftMessage } =
  messageSlice.actions;
export const selectMessage = (state: RootState) => state.messageReducer;
export default messageSlice.reducer;
