import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { GET_WORDS } from "../graphQlReq/graphQlReq";


// createAsyncThunk simplifies our Redux app by returning an action creator that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.
export const loadWords = createAsyncThunk(
  "allWords/loadWords",
  async () => {
    // const { loading, error, data } = useQuery(GET_WORDS_NEW);
    // const response = await fetch('https://picsum.photos/v2/list?page=3&limit=9');
    // const farmatted = await response.json();
    return GET_WORDS();

  }
);

const sliceOptions = {
  name: "allWords",
  initialState: {
    words:[],
    isLoading: false,
    hasError: false
  },
  reducers: {
    AddWORD:(state,action)=>{
      state.words.push(action.payload)
    }
  },
  extraReducers: {
    [loadWords.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadWords.fulfilled]: (state, action) => {
      state.words = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadWords.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
}

export const allWordsSlice = createSlice(sliceOptions);

export const { AddWORD } = allWordsSlice.actions

export const selectAllWords = (state) => state.allWords.words;

export default allWordsSlice.reducer;