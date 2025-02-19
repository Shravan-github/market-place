// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlicer";
import itemReducer from "../features/items/itemSlice";
import logger from "redux-logger";
import cartReducer, {
  loadCartFromLocalStorage,
} from "../features/cart/cartSlice";

const preloadedState = {
  cart: {
    items: loadCartFromLocalStorage(),
    status: "idle",
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Attach redux-logger
  preloadedState,
});

// Subscribe to store changes to save cart items
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});
