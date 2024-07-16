import { createSlice } from "@reduxjs/toolkit";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";
const THEME = "theme";

const themeReducer = createSlice({
  name: THEME,
  initialState: {
    theme: THEME_LIGHT,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    },
  },
});

export const { toggleTheme } = themeReducer.actions;

export default themeReducer.reducer;
