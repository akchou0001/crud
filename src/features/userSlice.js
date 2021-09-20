import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      state.user.email = "";
    },
    adduser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addemail, addid, adduser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
