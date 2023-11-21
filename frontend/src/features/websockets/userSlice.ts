import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  userId: string | null;
}

interface PayloadInterface {
  id: string;
}

let userState: UserInterface = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    loadUser: (state, action: PayloadAction<PayloadInterface>) => {
      state.userId = action.payload.id;
    },
  },
});

export const { loadUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.userId;
export default userSlice.reducer;
