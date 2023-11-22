import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum messageType {
  from = "from",
  to = "to",
}

type MessageTypes = {
  [id: string]: string;
};

interface MessageInterface {
  messages: MessageTypes[];
}

interface MessagePayload {
  from: string;
  to: string;
  message: string;
}

const messageState: MessageInterface = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: messageState,
  reducers: {
    addMessages: (state, action: PayloadAction<MessagePayload>) => {
      state.messages = [
        ...state.messages,
        {
          [action.payload.from]: action.payload.message,
        },
      ];
    },
  },
});
