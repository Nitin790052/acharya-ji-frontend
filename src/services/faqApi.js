import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const faqApi = createApi({
    reducerPath: 'faqApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['FAQ', 'FAQSettings'],
    endpoints: (builder) => ({
        getFAQs: builder.query({
            query: () => 'faqs',
            providesTags: ['FAQ'],
        }),
        getActiveFAQs: builder.query({
            query: () => 'faqs/active',
            providesTags: ['FAQ'],
        }),
        createFAQ: builder.mutation({
            query: (data) => ({ url: 'faqs', method: 'POST', body: data }),
            invalidatesTags: ['FAQ'],
        }),
        updateFAQ: builder.mutation({
            query: ({ id, ...data }) => ({ url: `faqs/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['FAQ'],
        }),
        deleteFAQ: builder.mutation({
            query: (id) => ({ url: `faqs/${id}`, method: 'DELETE' }),
            invalidatesTags: ['FAQ'],
        }),
        getFAQSettings: builder.query({
            query: () => 'faqs/settings',
            providesTags: ['FAQSettings'],
        }),
        updateFAQSettings: builder.mutation({
            query: (data) => ({ url: 'faqs/settings', method: 'PUT', body: data }),
            invalidatesTags: ['FAQSettings'],
        }),
        seedFAQs: builder.mutation({
            query: () => ({ url: 'faqs/seed', method: 'POST' }),
            invalidatesTags: ['FAQ'],
        }),
    }),
});

export const {
    useGetFAQsQuery,
    useGetActiveFAQsQuery,
    useCreateFAQMutation,
    useUpdateFAQMutation,
    useDeleteFAQMutation,
    useGetFAQSettingsQuery,
    useUpdateFAQSettingsMutation,
    useSeedFAQsMutation,
} = faqApi;
