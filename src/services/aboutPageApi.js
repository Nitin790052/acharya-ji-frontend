import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const aboutPageApi = createApi({
    reducerPath: 'aboutPageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['AboutPageSettings', 'AboutPageItem'],
    endpoints: (builder) => ({
        getAboutPageSettings: builder.query({
            query: () => 'about-page/settings',
            providesTags: ['AboutPageSettings'],
        }),
        updateAboutPageSettings: builder.mutation({
            query: (data) => ({ url: 'about-page/settings', method: 'PUT', body: data }),
            invalidatesTags: ['AboutPageSettings'],
        }),
        getAboutPageItems: builder.query({
            query: (tag) => `about-page/items/${tag}`,
            providesTags: ['AboutPageItem'],
        }),
        getActiveAboutPageItems: builder.query({
            query: (tag) => `about-page/items/${tag}?active=true`,
            providesTags: ['AboutPageItem'],
        }),
        createAboutPageItem: builder.mutation({
            query: (formData) => ({ url: 'about-page/items', method: 'POST', body: formData }),
            invalidatesTags: ['AboutPageItem'],
        }),
        updateAboutPageItem: builder.mutation({
            query: ({ id, formData }) => ({ url: `about-page/items/${id}`, method: 'PUT', body: formData }),
            invalidatesTags: ['AboutPageItem'],
        }),
        deleteAboutPageItem: builder.mutation({
            query: (id) => ({ url: `about-page/items/${id}`, method: 'DELETE' }),
            invalidatesTags: ['AboutPageItem'],
        }),
        seedAboutPage: builder.mutation({
            query: () => ({ url: 'about-page/seed', method: 'POST' }),
            invalidatesTags: ['AboutPageSettings', 'AboutPageItem'],
        }),
    }),
});

export const {
    useGetAboutPageSettingsQuery,
    useUpdateAboutPageSettingsMutation,
    useGetAboutPageItemsQuery,
    useGetActiveAboutPageItemsQuery,
    useCreateAboutPageItemMutation,
    useUpdateAboutPageItemMutation,
    useDeleteAboutPageItemMutation,
    useSeedAboutPageMutation,
} = aboutPageApi;
