import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const kundliContentApi = createApi({
    reducerPath: 'kundliContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/kundli-content` }),
    tagTypes: ['KundliContent'],
    endpoints: (builder) => ({
        getAllKundliPages: builder.query({
            query: () => '/',
            providesTags: ['KundliContent']
        }),
        getKundliPageBySlug: builder.query({
            query: (slug) => `/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'KundliContent', id: slug }]
        }),
        upsertKundliPage: builder.mutation({
            query: (pageData) => ({
                url: '/',
                method: 'POST',
                body: pageData
            }),
            invalidatesTags: ['KundliContent']
        }),
        updateKundliPageStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { isActive }
            }),
            invalidatesTags: ['KundliContent']
        }),
        deleteKundliPage: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['KundliContent']
        }),
        seedKundliData: builder.mutation({
            query: (slugs) => ({
                url: '/seed',
                method: 'POST',
                body: { slugs }
            }),
            invalidatesTags: ['KundliContent']
        }),
        forceSeedKundliData: builder.mutation({
            query: (slugs) => ({
                url: '/force-seed',
                method: 'POST',
                body: { slugs }
            }),
            invalidatesTags: ['KundliContent']
        })
    })
});

export const {
    useGetAllKundliPagesQuery,
    useGetKundliPageBySlugQuery,
    useUpsertKundliPageMutation,
    useUpdateKundliPageStatusMutation,
    useDeleteKundliPageMutation,
    useSeedKundliDataMutation,
    useForceSeedKundliDataMutation
} = kundliContentApi;

