import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/conversation`;
const initialState = {
  conversations: [],
  activeConversation: [],
  notifications: [],
  status: "",
  error: "",
};

export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = "";
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
  },
});

export const { setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;
