import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const vastuApi = createApi({
    reducerPath: 'vastuApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
    tagTypes: ['VastuService', 'VastuSettings'],
    endpoints: (builder) => ({
        getVastuSettings: builder.query({
            query: () => 'vastu-services/settings',
            providesTags: ['VastuSettings'],
        }),
        updateVastuSettings: builder.mutation({
            query: (data) => ({ url: 'vastu-services/settings', method: 'PUT', body: data }),
            invalidatesTags: ['VastuSettings'],
        }),
        getAllVastuServices: builder.query({
            query: () => 'vastu-services',
            providesTags: ['VastuService'],
        }),
        getActiveVastuServices: builder.query({
            query: () => 'vastu-services/active',
            providesTags: ['VastuService'],
        }),
        createVastuService: builder.mutation({
            query: (formData) => ({ url: 'vastu-services', method: 'POST', body: formData }),
            invalidatesTags: ['VastuService'],
        }),
        updateVastuService: builder.mutation({
            query: ({ id, formData }) => ({ url: `vastu-services/${id}`, method: 'PUT', body: formData }),
            invalidatesTags: ['VastuService'],
        }),
        deleteVastuService: builder.mutation({
            query: (id) => ({ url: `vastu-services/${id}`, method: 'DELETE' }),
            invalidatesTags: ['VastuService'],
        }),
        seedVastuServices: builder.mutation({
            query: () => ({ url: 'vastu-services/seed', method: 'POST' }),
            invalidatesTags: ['VastuService'],
        }),
    }),
});

export const {
    useGetVastuSettingsQuery,
    useUpdateVastuSettingsMutation,
    useGetAllVastuServicesQuery,
    useGetActiveVastuServicesQuery,
    useCreateVastuServiceMutation,
    useUpdateVastuServiceMutation,
    useDeleteVastuServiceMutation,
    useSeedVastuServicesMutation,
} = vastuApi;
