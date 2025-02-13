import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("userData") ? true : false,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      
      // Save user to localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;

      // Remove user from localStorage
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
