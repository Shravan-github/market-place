// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../../api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        console.log("Signup Pending...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log("Signup Successful!", action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens;
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("Signup Failed!", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })

      // Signin cases
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
