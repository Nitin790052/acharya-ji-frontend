import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const learningContentApi = createApi({
    reducerPath: 'learningContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/learning-content` }),
    tagTypes: ['LearningContent', 'LearningOverview'],
    endpoints: (builder) => ({
        getLearningPageBySlug: builder.query({
            query: (slug) => `/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'LearningContent', id: slug }],
        }),
        getLearningOverview: builder.query({
            query: () => '/overview',
            providesTags: ['LearningOverview'],
        }),
        updatePageSettings: builder.mutation({
            query: ({ slug, settings }) => ({
                url: `/settings/${slug}`,
                method: 'PUT',
                body: settings,
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'LearningContent', id: slug },
                'LearningOverview'
            ],
        }),
        updatePortalStatus: builder.mutation({
            query: ({ slug, isActive }) => ({
                url: `/status/${slug}`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'LearningContent', id: slug },
                'LearningOverview'
            ],
        }),
        createLearningItem: builder.mutation({
            query: ({ slug, formData }) => ({
                url: `/item/${slug}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'LearningContent', id: slug },
                'LearningOverview'
            ],
        }),
        updateLearningItem: builder.mutation({
            query: ({ slug, itemId, formData }) => ({
                url: `/item/${slug}/${itemId}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'LearningContent', id: slug },
                'LearningOverview'
            ],
        }),
        deleteLearningItem: builder.mutation({
            query: ({ slug, itemId }) => ({
                url: `/item/${slug}/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: 'LearningContent', id: slug },
                'LearningOverview'
            ],
        }),
        seedLearningHub: builder.mutation({
            query: () => ({
                url: '/seed',
                method: 'POST',
            }),
            invalidatesTags: ['LearningContent', 'LearningOverview'],
        }),
        uploadLearningImage: builder.mutation({
            query: (formData) => ({
                url: '/upload-image',
                method: 'POST',
                body: formData,
            }),
        }),
        deleteLearningMedia: builder.mutation({
            query: (filePath) => ({
                url: '/delete-media',
                method: 'DELETE',
                body: { filePath },
            }),
        }),
    }),
});

export const {
    useGetLearningPageBySlugQuery,
    useGetLearningOverviewQuery,
    useUpdatePageSettingsMutation,
    useUpdatePortalStatusMutation,
    useCreateLearningItemMutation,
    useUpdateLearningItemMutation,
    useDeleteLearningItemMutation,
    useSeedLearningHubMutation,
    useUploadLearningImageMutation,
    useDeleteLearningMediaMutation
} = learningContentApi;
