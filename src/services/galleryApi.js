import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const galleryApi = createApi({
    reducerPath: 'galleryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/gallery` }),
    tagTypes: ['Gallery'],
    endpoints: (builder) => ({
        getAllGallery: builder.query({
            query: () => '/',
            providesTags: ['Gallery'],
        }),
        getGalleryCategories: builder.query({
            query: () => '/categories',
            providesTags: ['Gallery'],
        }),
        createGallery: builder.mutation({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Gallery'],
        }),
        updateGallery: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Gallery'],
        }),
        deleteGallery: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Gallery'],
        }),
        seedGallery: builder.mutation({
            query: () => ({
                url: '/seed',
                method: 'POST',
            }),
            invalidatesTags: ['Gallery'],
        }),
        getGallerySettings: builder.query({
            query: () => '/settings',
            providesTags: ['GallerySettings'],
        }),
        updateGallerySettings: builder.mutation({
            query: (settingsData) => ({
                url: '/settings',
                method: 'PUT',
                body: settingsData,
            }),
            invalidatesTags: ['GallerySettings'],
        }),
    }),
});

export const {
    useGetAllGalleryQuery,
    useGetGalleryCategoriesQuery,
    useCreateGalleryMutation,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
    useSeedGalleryMutation,
    useGetGallerySettingsQuery,
    useUpdateGallerySettingsMutation,
} = galleryApi;
