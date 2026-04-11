import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const pujaOfferingApi = createApi({
    reducerPath: 'pujaOfferingApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['PujaOfferings'],
    endpoints: (builder) => ({
        getAllOfferings: builder.query({
            query: () => 'puja-offerings',
            providesTags: ['PujaOfferings'],
        }),
        getOfferingBySlug: builder.query({
            query: (slug) => `puja-offerings/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'PujaOfferings', id: slug }],
        }),
        createOffering: builder.mutation({
            query: (formData) => ({
                url: 'puja-offerings',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['PujaOfferings'],
        }),
        updateOffering: builder.mutation({
            query: ({ id, formData }) => ({
                url: `puja-offerings/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['PujaOfferings'],
        }),
        deleteOffering: builder.mutation({
            query: (id) => ({
                url: `puja-offerings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PujaOfferings'],
        }),
        seedOfferings: builder.mutation({
            query: () => ({
                url: 'puja-offerings/seed',
                method: 'POST',
            }),
            invalidatesTags: ['PujaOfferings'],
        }),
    }),
});

export const {
    useGetAllOfferingsQuery,
    useGetOfferingBySlugQuery,
    useCreateOfferingMutation,
    useUpdateOfferingMutation,
    useDeleteOfferingMutation,
    useSeedOfferingsMutation,
} = pujaOfferingApi;
