import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

interface themeInterface {
  dark: boolean;
  light: boolean;
  styles: string;
  homePageStyles: string;
}

let themeState: themeInterface = {
  dark: false,
  light: true,
  styles: "bg-red-600 text-black",
  homePageStyles: "",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: themeState,
  reducers: {
    setDark: (state: themeInterface) => {
      state.dark = true;
      state.light = false;
      state.styles = "bg-[#F6B17A] text-white";
      // state.homePageStyles = "bg-[#5C469C] text-white";
    },
    setLigth: (state: themeInterface) => {
      state.dark = false;
      state.light = true;
      state.styles = "bg-red-300 text-black";
      // state.homePageStyles = "bg-[#E5D4FF] text-black";
    },
  },
});

export const { setDark, setLigth } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeReducer;
export default themeSlice.reducer;
