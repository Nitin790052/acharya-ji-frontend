import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Services'],
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => 'services',
            providesTags: ['Services'],
        }),
        getActiveServices: builder.query({
            query: () => 'services/active',
            providesTags: ['Services'],
        }),
        createService: builder.mutation({
            query: (formData) => ({
                url: 'services',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Services'],
        }),
        updateService: builder.mutation({
            query: ({ id, formData }) => ({
                url: `services/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Services'],
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `services/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Services'],
        }),
        toggleActiveService: builder.mutation({
            query: (id) => ({
                url: `services/toggle-active/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Services'],
        }),
        seedServices: builder.mutation({
            query: () => ({
                url: 'services/seed',
                method: 'POST',
            }),
            invalidatesTags: ['Services'],
        }),
    }),
});

export const {
    useGetAllServicesQuery,
    useGetActiveServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useToggleActiveServiceMutation,
    useSeedServicesMutation
} = serviceApi;
