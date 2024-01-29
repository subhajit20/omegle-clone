import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

interface themeInterface {
  dark: boolean;
  light: boolean;
  styles: string;
}

let themeState: themeInterface = {
  dark: false,
  light: true,
  styles: "bg-white text-white",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: themeState,
  reducers: {
    setDark: (state) => {
      state.dark = true;
      state.light = false;
      state.styles = "bg-black text-white";
    },
    setLigth: (state) => {
      state.light = true;
      state.dark = false;
      state.styles = "bg-white text-text";
    },
  },
});

export const { setDark, setLigth } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeReducer;
export default themeSlice.reducer;
