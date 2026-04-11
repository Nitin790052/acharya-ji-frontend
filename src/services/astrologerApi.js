import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const astrologerApi = createApi({
    reducerPath: 'astrologerApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['Astrologer', 'AstrologerSettings'],
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => 'astrologers/settings',
            providesTags: ['AstrologerSettings'],
        }),
        updateSettings: builder.mutation({
            query: (settings) => ({
                url: 'astrologers/settings',
                method: 'PUT',
                body: settings,
            }),
            invalidatesTags: ['AstrologerSettings'],
        }),
        getAllAstrologers: builder.query({
            query: () => 'astrologers',
            providesTags: ['Astrologer'],
        }),
        getActiveAstrologers: builder.query({
            query: () => 'astrologers/active',
            providesTags: ['Astrologer'],
        }),
        createAstrologer: builder.mutation({
            query: (formData) => ({
                url: 'astrologers',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Astrologer'],
        }),
        updateAstrologer: builder.mutation({
            query: ({ id, formData }) => ({
                url: `astrologers/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Astrologer'],
        }),
        deleteAstrologer: builder.mutation({
            query: (id) => ({
                url: `astrologers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Astrologer'],
        }),
        seedAstrologers: builder.mutation({
            query: () => ({
                url: 'astrologers/seed',
                method: 'POST',
            }),
            invalidatesTags: ['Astrologer'],
        }),
    }),
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
    useGetAllAstrologersQuery,
    useGetActiveAstrologersQuery,
    useCreateAstrologerMutation,
    useUpdateAstrologerMutation,
    useDeleteAstrologerMutation,
    useSeedAstrologersMutation,
} = astrologerApi;
