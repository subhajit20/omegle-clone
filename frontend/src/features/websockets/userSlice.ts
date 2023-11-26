import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  userId: string | null;
  roomId: string | null;
  roomMembers: string[];
}

interface PayloadInterface {
  id: string;
}

interface PayloadJoinRoomInterface {
  id: string;
  members: string[];
}

let userState: UserInterface = {
  userId: null,
  roomId: null,
  roomMembers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    loadUser: (state, action: PayloadAction<PayloadInterface>) => {
      state.userId = action.payload.id;
    },
    joinUserToRoom: (
      state,
      action: PayloadAction<PayloadJoinRoomInterface>
    ) => {
      const { id, members } = action.payload;
      state.roomId = id;
      state.roomMembers = [...members];
    },
    leftRoom: (state) => {
      state.roomId = null;
      state.roomMembers = [];
    },
  },
});

export const { loadUser, joinUserToRoom, leftRoom } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer;
export default userSlice.reducer;
