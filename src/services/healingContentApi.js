import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const healingContentApi = createApi({
    reducerPath: 'healingContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/healing-content` }),
    tagTypes: ['HealingContent'],
    endpoints: (builder) => ({
        getAllHealingPages: builder.query({
            query: () => '/',
            providesTags: ['HealingContent']
        }),
        getHealingPageBySlug: builder.query({
            query: (slug) => `/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'HealingContent', id: slug }]
        }),
        upsertHealingPage: builder.mutation({
            query: (pageData) => ({
                url: '/',
                method: 'POST',
                body: pageData
            }),
            invalidatesTags: ['HealingContent']
        }),
        updateHealingPageStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { isActive }
            }),
            invalidatesTags: ['HealingContent']
        }),
        deleteHealingPage: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['HealingContent']
        }),
        seedHealingData: builder.mutation({
            query: (slugs) => ({
                url: '/seed',
                method: 'POST',
                body: { slugs }
            }),
            invalidatesTags: ['HealingContent']
        }),
        forceSeedHealingData: builder.mutation({
            query: (slugs) => ({
                url: '/force-seed',
                method: 'POST',
                body: { slugs }
            }),
            invalidatesTags: ['HealingContent']
        })
    })
});

export const {
    useGetAllHealingPagesQuery,
    useGetHealingPageBySlugQuery,
    useUpsertHealingPageMutation,
    useUpdateHealingPageStatusMutation,
    useDeleteHealingPageMutation,
    useSeedHealingDataMutation,
    useForceSeedHealingDataMutation
} = healingContentApi;
