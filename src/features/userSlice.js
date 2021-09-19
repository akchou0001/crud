import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addemail: (state, action) => {
      state.user.email = action.payload.email;
    },
    addid: (state, action) => {
      state.user.id = action.payload.id;
    },
  },
});

export const { addemail, addid } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
