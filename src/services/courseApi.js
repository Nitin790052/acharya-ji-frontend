import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/courses` }),
    tagTypes: ['Course', 'CourseSettings', 'CourseOverview'],
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: (type) => `?type=${type}`,
            providesTags: ['Course']
        }),
        getCourseSettings: builder.query({
            query: (type) => `/settings/${type}`,
            providesTags: ['CourseSettings']
        }),
        getCourseOverview: builder.query({
            query: () => '/overview',
            providesTags: ['CourseOverview', 'Course', 'CourseSettings'],
        }),
        createCourse: builder.mutation({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Course', 'CourseOverview']
        }),
        updateCourse: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Course', 'CourseOverview']
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Course', 'CourseOverview']
        }),
        updateCourseSettings: builder.mutation({
            query: ({ type, settings }) => ({
                url: `/settings/${type}`,
                method: 'PUT',
                body: settings
            }),
            invalidatesTags: ['CourseSettings', 'CourseOverview']
        }),
        updateCourseStatus: builder.mutation({
            query: ({ type, isActive }) => ({
                url: `/status/${type}`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: ['CourseOverview', 'CourseSettings'],
        }),
        seedCourses: builder.mutation({
            query: (type) => ({
                url: `/seed/${type}`,
                method: 'POST'
            }),
            invalidatesTags: ['Course', 'CourseSettings', 'CourseOverview']
        })
    })
});

export const {
    useGetAllCoursesQuery,
    useGetCourseSettingsQuery,
    useGetCourseOverviewQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseSettingsMutation,
    useUpdateCourseStatusMutation,
    useSeedCoursesMutation
} = courseApi;
