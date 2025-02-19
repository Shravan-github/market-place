// src/services/api.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);
        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        localStorage.clear();
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  "/api/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/signup/`, userData); //Makes POST request to signup endpoint
      localStorage.setItem("refreshToken", response.data?.tokens?.refresh);
      localStorage.setItem("token", response.data?.tokens?.access); //Stores authentication tokens in localStorage
      localStorage.setItem("user", JSON.stringify(response.data?.user)); //Stores authentication tokens in localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); //Handles errors using rejectWithValue
    }
  }
);

// Async thunk for signin
export const signin = createAsyncThunk(
  "auth/signin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/signin/`, userData);
      localStorage.setItem("refreshToken", response.data.tokens?.refresh);
      localStorage.setItem("token", response.data.tokens?.access);
      localStorage.setItem("user", JSON.stringify(response.data?.user)); //Stores authentication tokens in localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/items/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'items/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/items/', productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'items/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/items/${id}/`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default axiosInstance;
