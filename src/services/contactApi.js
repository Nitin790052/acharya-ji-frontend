import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['ContactSettings'],
    endpoints: (builder) => ({
        getContactSettings: builder.query({
            query: () => 'contact-settings',
            providesTags: ['ContactSettings'],
        }),
        updateContactSettings: builder.mutation({
            query: (data) => ({
                url: 'contact-settings',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['ContactSettings'],
        }),
        seedContactSettings: builder.mutation({
            query: () => ({
                url: 'contact-settings/seed',
                method: 'POST',
            }),
            invalidatesTags: ['ContactSettings'],
        }),
        submitContactForm: builder.mutation({
            query: (data) => ({
                url: 'contact/submit', // Currently there's no backend for this, we simulate it OR we might add it later
                method: 'POST',
                body: data
            })
        })
    }),
});

export const {
    useGetContactSettingsQuery,
    useUpdateContactSettingsMutation,
    useSeedContactSettingsMutation,
    useSubmitContactFormMutation
} = contactApi;
