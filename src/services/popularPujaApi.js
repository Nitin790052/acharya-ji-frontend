import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const popularPujaApi = createApi({
    reducerPath: 'popularPujaApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL
    }),
    tagTypes: ['PopularPuja'],
    endpoints: (builder) => ({
        getActivePujas: builder.query({
            query: () => 'popular-pujas/active',
            providesTags: ['PopularPuja'],
        }),
        // Admin endpoints for mutations (CRUD)
        getAllPujas: builder.query({
            query: () => 'popular-pujas',
            providesTags: ['PopularPuja'],
        }),
        createPuja: builder.mutation({
            query: (formData) => ({
                url: 'popular-pujas',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['PopularPuja'],
        }),
        updatePuja: builder.mutation({
            query: ({ id, formData }) => ({
                url: `popular-pujas/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['PopularPuja'],
        }),
        deletePuja: builder.mutation({
            query: (id) => ({
                url: `popular-pujas/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PopularPuja'],
        }),
        seedPujas: builder.mutation({
            query: () => ({
                url: 'popular-pujas/seed',
                method: 'POST',
            }),
            invalidatesTags: ['PopularPuja'],
        }),
        getSettings: builder.query({
            query: () => 'popular-pujas/settings',
            providesTags: ['PopularPuja'],
        }),
        updateSettings: builder.mutation({
            query: (settings) => ({
                url: 'popular-pujas/settings',
                method: 'PUT',
                body: settings,
            }),
            invalidatesTags: ['PopularPuja'],
        }),
    }),
});

export const { 
    useGetActivePujasQuery, 
    useGetAllPujasQuery, 
    useCreatePujaMutation,
    useUpdatePujaMutation,
    useDeletePujaMutation,
    useSeedPujasMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation
} = popularPujaApi;
