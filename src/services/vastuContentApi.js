import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const vastuContentApi = createApi({
    reducerPath: 'vastuContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/vastu-content` }),
    tagTypes: ['VastuPage'],
    endpoints: (builder) => ({
        getAllVastuPages: builder.query({
            query: () => '/all',
            providesTags: ['VastuPage'],
        }),
        getVastuPageBySlug: builder.query({
            query: (slug) => `/slug/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'VastuPage', id: slug }],
        }),
        upsertVastuPage: builder.mutation({
            query: (formData) => ({
                url: '/upsert',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['VastuPage'],
        }),
        deleteVastuPage: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['VastuPage'],
        }),
        updateVastuPageStatus: builder.mutation({
            query: ({ slug, isActive }) => ({
                url: `/status/${slug}`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: ['VastuPage'],
        }),
        seedVastuData: builder.mutation({
            query: (data) => ({
                url: '/seed',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['VastuPage'],
        }),
        forceSeedVastuData: builder.mutation({
            query: (data) => ({
                url: '/force-seed',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['VastuPage'],
        }),
    }),
});

export const {
    useGetAllVastuPagesQuery,
    useGetVastuPageBySlugQuery,
    useUpsertVastuPageMutation,
    useDeleteVastuPageMutation,
    useUpdateVastuPageStatusMutation,
    useSeedVastuDataMutation,
    useForceSeedVastuDataMutation,
} = vastuContentApi;
