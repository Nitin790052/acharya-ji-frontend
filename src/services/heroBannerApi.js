import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const heroBannerApi = createApi({
    reducerPath: 'heroBannerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['HeroBanner'],
    endpoints: (builder) => ({
        getActiveBanners: builder.query({
            query: () => 'hero-banners/active',
            providesTags: ['HeroBanner'],
        }),
        // Admin endpoints for mutations (CRUD)
        getAllBanners: builder.query({
            query: () => 'hero-banners',
            providesTags: ['HeroBanner'],
        }),
        createBanner: builder.mutation({
            query: (formData) => ({
                url: 'hero-banners',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['HeroBanner'],
        }),
        updateBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `hero-banners/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['HeroBanner'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `hero-banners/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['HeroBanner'],
        }),
        seedBanners: builder.mutation({
            query: () => ({
                url: 'hero-banners/seed',
                method: 'POST',
            }),
            invalidatesTags: ['HeroBanner'],
        }),
    }),
});

export const {
    useGetActiveBannersQuery,
    useGetAllBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
    useSeedBannersMutation
} = heroBannerApi;
