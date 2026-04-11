import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const appDownloadApi = createApi({
    reducerPath: 'appDownloadApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['AppDownload'],
    endpoints: (builder) => ({
        getAppDownloadSettings: builder.query({
            query: () => 'app-download',
            providesTags: ['AppDownload'],
        }),
        updateAppDownloadSettings: builder.mutation({
            query: (data) => ({ url: 'app-download', method: 'PUT', body: data }),
            invalidatesTags: ['AppDownload'],
        }),
    }),
});

export const {
    useGetAppDownloadSettingsQuery,
    useUpdateAppDownloadSettingsMutation,
} = appDownloadApi;
