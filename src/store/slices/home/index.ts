import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
  title:string
}

const initialState: HeaderState = {
    title:'New App'
};

export const headerSlice = createSlice({
  name: 'HOME',
  initialState,
  
  reducers: {
    selectCategoryFilter: (state, {payload}) => {
      console.log(payload,"payload")
    },
  },


  extraReducers: (builder) => {
    // builder.addMatcher(searchApi.endpoints.getSearchText.matchFulfilled,(state,{ payload }: responseTypeSearchText) => {
    //     console.log("Example app")
    // }),
  },
});

export const { selectCategoryFilter } = headerSlice.actions;
export default headerSlice.reducer;