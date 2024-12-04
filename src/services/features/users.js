import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../utils/data";

export const initState = {
  users: data,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    editUser: (state, action) => {
      const { payload } = action;
      state.users[payload.id] = payload;
    },
  },
});
export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;
