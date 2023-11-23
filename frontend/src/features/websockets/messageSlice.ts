import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MesssageType {
  type: string;
  message: string;
}

interface MessageInterface {
  allMessages: MesssageType[];
}

interface MessagePayload {
  type: string;
  message: string;
}

const messageState: MessageInterface = {
  allMessages: [],
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
  },
});

export const { addMessages, deleteAllMessage } = messageSlice.actions;
export const selectMessage = (state: RootState) =>
  state.messageReducer.allMessages;
export default messageSlice.reducer;
