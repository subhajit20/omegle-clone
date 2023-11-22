import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  userId: string | null;
  roomId: string | null;
}

interface PayloadInterface {
  id: string;
}

let userState: UserInterface = {
  userId: null,
  roomId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    loadUser: (state, action: PayloadAction<PayloadInterface>) => {
      state.userId = action.payload.id;
    },
    joinRoom: (state, action: PayloadAction<PayloadInterface>) => {
      state.roomId = action.payload.id;
    },
    leftRoom: (state) => {
      state.roomId = null;
    },
  },
});

export const { loadUser, joinRoom, leftRoom } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.userId;
export default userSlice.reducer;
