import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const universalContentApi = createApi({
    reducerPath: 'universalContentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/universal-content`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['UniversalContent', 'UniversalOverview'],
    endpoints: (builder) => ({
        getUniversalOverview: builder.query({
            query: () => '/overview',
            providesTags: ['UniversalOverview'],
        }),
        getPageBySlug: builder.query({
            query: (slug) => `/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'UniversalContent', id: slug }],
        }),
        updatePageContent: builder.mutation({
            query: ({ slug, content }) => ({
                url: `/update/${slug}`,
                method: 'POST',
                body: content,
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'UniversalContent', id: slug },
                'UniversalOverview'
            ],
        }),
        deleteUniversalPage: builder.mutation({
            query: (slug) => ({
                url: `/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UniversalOverview'],
        }),
        uploadUniversalMedia: builder.mutation({
            query: (formData) => ({
                url: '/upload-media',
                method: 'POST',
                body: formData,
            }),
        }),
        purgeUniversalMedia: builder.mutation({
            query: (filePath) => ({
                url: '/purge-media',
                method: 'POST',
                body: { filePath },
            }),
        }),
    }),
});

export const {
    useGetUniversalOverviewQuery,
    useGetPageBySlugQuery,
    useUpdatePageContentMutation,
    useDeleteUniversalPageMutation,
    useUploadUniversalMediaMutation,
    usePurgeUniversalMediaMutation
} = universalContentApi;
