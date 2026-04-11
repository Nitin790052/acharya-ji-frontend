import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const careerContentApi = createApi({
  reducerPath: 'careerContentApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['CareerContent'],
  endpoints: (builder) => ({
    getCareerContent: builder.query({
      query: () => '/career-content',
      providesTags: ['CareerContent'],
    }),
    getCareerContentByType: builder.query({
      query: (type) => `/career-content/type/${type}`,
      providesTags: (result, error, type) => [{ type: 'CareerContent', id: type }],
    }),
    createCareerContent: builder.mutation({
      query: (newContent) => ({
        url: '/career-content',
        method: 'POST',
        body: newContent,
      }),
      invalidatesTags: ['CareerContent'],
    }),
    updateCareerContent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/career-content/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['CareerContent'],
    }),
    deleteCareerContent: builder.mutation({
      query: (id) => ({
        url: `/career-content/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CareerContent'],
    }),
    seedCareerContentWithType: builder.mutation({
      query: (type) => ({
        url: `/career-content/seed/${type}`,
        method: 'POST',
      }),
      invalidatesTags: ['CareerContent'],
    }),
  }),
});

export const {
  useGetCareerContentQuery,
  useGetCareerContentByTypeQuery,
  useCreateCareerContentMutation,
  useUpdateCareerContentMutation,
  useDeleteCareerContentMutation,
  useSeedCareerContentWithTypeMutation,
} = careerContentApi;
