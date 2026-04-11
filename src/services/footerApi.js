import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const footerApi = createApi({
    reducerPath: 'footerApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['Footer'],
    endpoints: (builder) => ({
        getFooterSettings: builder.query({
            query: () => 'footer',
            providesTags: ['Footer'],
        }),
        updateFooterSettings: builder.mutation({
            query: (data) => ({ url: 'footer', method: 'PUT', body: data }),
            invalidatesTags: ['Footer'],
        }),
        seedFooterSettings: builder.mutation({
            query: () => ({ url: 'footer/seed', method: 'POST' }),
            invalidatesTags: ['Footer'],
        }),
    }),
});

export const {
    useGetFooterSettingsQuery,
    useUpdateFooterSettingsMutation,
    useSeedFooterSettingsMutation,
} = footerApi;
