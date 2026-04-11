import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const navbarApi = createApi({
    reducerPath: 'navbarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        getNavbarItems: builder.query({
            query: () => 'navbar',
        }),
    }),
});

export const { useGetNavbarItemsQuery } = navbarApi;
