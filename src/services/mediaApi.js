import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const mediaApi = createApi({
    reducerPath: 'mediaApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/media` }),
    tagTypes: ['Media'],
    endpoints: (builder) => ({
        getAllMedia: builder.query({
            query: () => '/',
            providesTags: ['Media'],
        }),
        getMediaByType: builder.query({
            query: (type) => `/type/${type}`,
            providesTags: ['Media'],
        }),
        createMedia: builder.mutation({
            query: (newMedia) => ({
                url: '/',
                method: 'POST',
                body: newMedia,
            }),
            invalidatesTags: ['Media'],
        }),
        updateMedia: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Media'],
        }),
        deleteMedia: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Media'],
        }),
        seedMedia: builder.mutation({
            query: () => ({
                url: '/seed',
                method: 'POST',
            }),
            invalidatesTags: ['Media'],
        }),
        getMediaSettings: builder.query({
            query: () => '/settings',
            providesTags: ['Media'],
        }),
        updateMediaSettings: builder.mutation({
            query: (settings) => ({
                url: '/settings',
                method: 'PUT',
                body: settings,
            }),
            invalidatesTags: ['Media'],
        }),
    }),
});

export const {
    useGetAllMediaQuery,
    useGetMediaByTypeQuery,
    useCreateMediaMutation,
    useUpdateMediaMutation,
    useDeleteMediaMutation,
    useSeedMediaMutation,
    useGetMediaSettingsQuery,
    useUpdateMediaSettingsMutation,
} = mediaApi;
