import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const kundliApi = createApi({
    reducerPath: 'kundliApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['KundliService', 'KundliSettings'],
    endpoints: (builder) => ({
        getKundliSettings: builder.query({
            query: () => 'kundli-services/settings',
            providesTags: ['KundliSettings'],
        }),
        updateKundliSettings: builder.mutation({
            query: (data) => ({ url: 'kundli-services/settings', method: 'PUT', body: data }),
            invalidatesTags: ['KundliSettings'],
        }),
        getAllKundliServices: builder.query({
            query: () => 'kundli-services',
            providesTags: ['KundliService'],
        }),
        getActiveKundliServices: builder.query({
            query: () => 'kundli-services/active',
            providesTags: ['KundliService'],
        }),
        createKundliService: builder.mutation({
            query: (formData) => ({ url: 'kundli-services', method: 'POST', body: formData }),
            invalidatesTags: ['KundliService'],
        }),
        updateKundliService: builder.mutation({
            query: ({ id, formData }) => ({ url: `kundli-services/${id}`, method: 'PUT', body: formData }),
            invalidatesTags: ['KundliService'],
        }),
        deleteKundliService: builder.mutation({
            query: (id) => ({ url: `kundli-services/${id}`, method: 'DELETE' }),
            invalidatesTags: ['KundliService'],
        }),
        seedKundliServices: builder.mutation({
            query: () => ({ url: 'kundli-services/seed', method: 'POST' }),
            invalidatesTags: ['KundliService'],
        }),
    }),
});

export const {
    useGetKundliSettingsQuery,
    useUpdateKundliSettingsMutation,
    useGetAllKundliServicesQuery,
    useGetActiveKundliServicesQuery,
    useCreateKundliServiceMutation,
    useUpdateKundliServiceMutation,
    useDeleteKundliServiceMutation,
    useSeedKundliServicesMutation,
} = kundliApi;
