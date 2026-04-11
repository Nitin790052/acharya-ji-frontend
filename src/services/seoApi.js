import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const seoApi = createApi({
    reducerPath: 'seoApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['PageSEO'],
    endpoints: (builder) => ({
        getAllSEOConfigs: builder.query({
            query: () => 'seo',
            providesTags: ['PageSEO'],
        }),
        getSEOByPageName: builder.query({
            query: (pageName) => `seo/${pageName}`,
            providesTags: (result, error, pageName) => [{ type: 'PageSEO', id: pageName }],
        }),
        updatePageSEO: builder.mutation({
            query: (data) => ({
                url: 'seo/update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { pageName }) => ['PageSEO', { type: 'PageSEO', id: pageName }],
        }),
        deletePageSEO: builder.mutation({
            query: (id) => ({
                url: `seo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['PageSEO'],
        }),
    }),
});

export const {
    useGetAllSEOConfigsQuery,
    useGetSEOByPageNameQuery,
    useUpdatePageSEOMutation,
    useDeletePageSEOMutation,
} = seoApi;
