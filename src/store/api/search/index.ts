import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const searchApi = createApi({
  reducerPath: "searchApi",
  tagTypes: ["searchQuery"],
  baseQuery: fetchBaseQuery({
    baseUrl:"http//:url",
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include"
  }),

  endpoints: (builder) => ({
    addSearchTextToDb: builder.mutation({
      query: (value:string) => {
        return ({
          method: 'PUT',
          url:`/search/text`,
          body:{searchTextValue:value}   
        })
      },
      invalidatesTags: ['searchQuery'],
    }),

    getSearchText: builder.query({
      query: () => {
        return ({
          method: 'GET',
          url:`/search/text`,
        })
      },
      providesTags: ['searchQuery'],
    }),
  }),
});

export const { useAddSearchTextToDbMutation, useLazyGetSearchTextQuery } = searchApi;