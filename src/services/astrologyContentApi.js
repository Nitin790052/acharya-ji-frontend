import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const astrologyContentApi = createApi({
    reducerPath: 'astrologyContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/astrology-content/` }),
    tagTypes: ['AstrologyContent'],
    endpoints: (builder) => ({
        getAllAstrologyPages: builder.query({
            query: () => '',
            providesTags: ['AstrologyContent']
        }),
        getAstrologyPageBySlug: builder.query({
            query: (slug) => `${slug}`,
            providesTags: (result, error, slug) => [{ type: 'AstrologyContent', id: slug }]
        }),
        upsertAstrologyPage: builder.mutation({
            query: (pageData) => ({
                url: '',
                method: 'POST',
                body: pageData,
            }),
            invalidatesTags: ['AstrologyContent']
        }),
        deleteAstrologyPage: builder.mutation({
            query: (slug) => ({
                url: `${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AstrologyContent']
        }),
        seedAstrologyData: builder.mutation({
            query: (slugs) => ({
                url: 'seed',
                method: 'POST',
                body: { slugs },
            }),
            invalidatesTags: ['AstrologyContent']
        }),
        forceSeedAstrologyData: builder.mutation({
            query: (slugs) => ({
                url: 'force-seed',
                method: 'POST',
                body: { slugs },
            }),
            invalidatesTags: ['AstrologyContent']
        })
    })
});

export const {
    useGetAllAstrologyPagesQuery,
    useGetAstrologyPageBySlugQuery,
    useUpsertAstrologyPageMutation,
    useDeleteAstrologyPageMutation,
    useSeedAstrologyDataMutation,
    useForceSeedAstrologyDataMutation
} = astrologyContentApi;
