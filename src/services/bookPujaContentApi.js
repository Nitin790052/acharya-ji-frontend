import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const bookPujaContentApi = createApi({
    reducerPath: 'bookPujaContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/book-puja-content` }),
    tagTypes: ['Steps', 'Experts', 'Samagri', 'FAQs'],
    endpoints: (builder) => ({
        // Steps
        getSteps: builder.query({
            query: () => '/steps',
            providesTags: ['Steps'],
        }),
        updateStep: builder.mutation({
            query: ({ id, ...body }) => ({ url: `/steps/${id}`, method: 'PUT', body }),
            invalidatesTags: ['Steps'],
        }),
        createStep: builder.mutation({
            query: (body) => ({ url: '/steps', method: 'POST', body }),
            invalidatesTags: ['Steps'],
        }),
        deleteStep: builder.mutation({
            query: (id) => ({ url: `/steps/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Steps'],
        }),

        // Experts
        getExperts: builder.query({
            query: () => '/experts',
            providesTags: ['Experts'],
        }),
        updateExpert: builder.mutation({
            query: ({ id, ...body }) => ({ url: `/experts/${id}`, method: 'PUT', body }),
            invalidatesTags: ['Experts'],
        }),
        createExpert: builder.mutation({
            query: (body) => ({ url: '/experts', method: 'POST', body }),
            invalidatesTags: ['Experts'],
        }),
        deleteExpert: builder.mutation({
            query: (id) => ({ url: `/experts/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Experts'],
        }),

        // Samagri
        getSamagri: builder.query({
            query: () => '/samagri',
            providesTags: ['Samagri'],
        }),
        updateSamagri: builder.mutation({
            query: ({ id, ...body }) => ({ url: `/samagri/${id}`, method: 'PUT', body }),
            invalidatesTags: ['Samagri'],
        }),
        createSamagri: builder.mutation({
            query: (body) => ({ url: '/samagri', method: 'POST', body }),
            invalidatesTags: ['Samagri'],
        }),
        deleteSamagri: builder.mutation({
            query: (id) => ({ url: `/samagri/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Samagri'],
        }),

        // FAQs
        getFAQs: builder.query({
            query: () => '/faqs',
            providesTags: ['FAQs'],
        }),
        updateFAQ: builder.mutation({
            query: ({ id, ...body }) => ({ url: `/faqs/${id}`, method: 'PUT', body }),
            invalidatesTags: ['FAQs'],
        }),
        createFAQ: builder.mutation({
            query: (body) => ({ url: '/faqs', method: 'POST', body }),
            invalidatesTags: ['FAQs'],
        }),
        deleteFAQ: builder.mutation({
            query: (id) => ({ url: `/faqs/${id}`, method: 'DELETE' }),
            invalidatesTags: ['FAQs'],
        }),

        seedContent: builder.mutation({
            query: () => ({ url: '/seed', method: 'POST' }),
            invalidatesTags: ['Steps', 'Experts', 'Samagri', 'FAQs'],
        }),
    }),
});

export const {
    useGetStepsQuery,
    useCreateStepMutation,
    useUpdateStepMutation,
    useDeleteStepMutation,
    useGetExpertsQuery,
    useCreateExpertMutation,
    useUpdateExpertMutation,
    useDeleteExpertMutation,
    useGetSamagriQuery,
    useCreateSamagriMutation,
    useUpdateSamagriMutation,
    useDeleteSamagriMutation,
    useGetFAQsQuery,
    useCreateFAQMutation,
    useUpdateFAQMutation,
    useDeleteFAQMutation,
    useSeedContentMutation,
} = bookPujaContentApi;
