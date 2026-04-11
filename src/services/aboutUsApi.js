import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const aboutUsApi = createApi({
    reducerPath: 'aboutUsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['AboutUs'],
    endpoints: (builder) => ({
        getAllAboutUs: builder.query({
            query: () => 'about-us',
            providesTags: ['AboutUs'],
        }),
        getActiveAboutUs: builder.query({
            query: () => 'about-us/active',
            providesTags: ['AboutUs'],
        }),
        createAboutUs: builder.mutation({
            query: (formData) => ({
                url: 'about-us',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['AboutUs'],
        }),
        updateAboutUs: builder.mutation({
            query: ({ id, formData }) => ({
                url: `about-us/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['AboutUs'],
        }),
        deleteAboutUs: builder.mutation({
            query: (id) => ({
                url: `about-us/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AboutUs'],
        }),
        activateAboutUs: builder.mutation({
            query: (id) => ({
                url: `about-us/activate/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['AboutUs'],
        }),
    }),
});

export const {
    useGetAllAboutUsQuery,
    useGetActiveAboutUsQuery,
    useCreateAboutUsMutation,
    useUpdateAboutUsMutation,
    useDeleteAboutUsMutation,
    useActivateAboutUsMutation,
} = aboutUsApi;
