import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  stats: [],
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
  },
});

export const { setStats } = statsSlice.actions;
export default statsSlice.reducer;