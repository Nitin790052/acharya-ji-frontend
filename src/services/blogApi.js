import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['Blog', 'BlogSettings'],
    endpoints: (builder) => ({
        getBlogSettings: builder.query({
            query: () => 'blogs/settings',
            providesTags: ['BlogSettings'],
        }),
        updateBlogSettings: builder.mutation({
            query: (data) => ({ url: 'blogs/settings', method: 'PUT', body: data }),
            invalidatesTags: ['BlogSettings'],
        }),
        getAllBlogs: builder.query({
            query: () => 'blogs',
            providesTags: ['Blog'],
        }),
        getActiveBlogs: builder.query({
            query: () => 'blogs/active',
            providesTags: ['Blog'],
        }),
        createBlog: builder.mutation({
            query: (formData) => ({ url: 'blogs', method: 'POST', body: formData }),
            invalidatesTags: ['Blog'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, formData }) => ({ url: `blogs/${id}`, method: 'PUT', body: formData }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({ url: `blogs/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Blog'],
        }),
        seedBlogs: builder.mutation({
            query: () => ({ url: 'blogs/seed', method: 'POST' }),
            invalidatesTags: ['Blog'],
        }),
    }),
});

export const {
    useGetBlogSettingsQuery,
    useUpdateBlogSettingsMutation,
    useGetAllBlogsQuery,
    useGetActiveBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useSeedBlogsMutation,
} = blogApi;
