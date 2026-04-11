import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const testimonialApi = createApi({
    reducerPath: 'testimonialApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
    tagTypes: ['Testimonial', 'TestimonialSettings'],
    endpoints: (builder) => ({
        getTestimonialSettings: builder.query({
            query: () => 'testimonials/settings',
            providesTags: ['TestimonialSettings'],
        }),
        updateTestimonialSettings: builder.mutation({
            query: (data) => ({ url: 'testimonials/settings', method: 'PUT', body: data }),
            invalidatesTags: ['TestimonialSettings'],
        }),
        getAllTestimonials: builder.query({
            query: () => 'testimonials',
            providesTags: ['Testimonial'],
        }),
        getActiveTestimonials: builder.query({
            query: () => 'testimonials/active',
            providesTags: ['Testimonial'],
        }),
        createTestimonial: builder.mutation({
            query: (formData) => ({ url: 'testimonials', method: 'POST', body: formData }),
            invalidatesTags: ['Testimonial'],
        }),
        updateTestimonial: builder.mutation({
            query: ({ id, formData }) => ({ url: `testimonials/${id}`, method: 'PUT', body: formData }),
            invalidatesTags: ['Testimonial'],
        }),
        deleteTestimonial: builder.mutation({
            query: (id) => ({ url: `testimonials/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Testimonial'],
        }),
        seedTestimonials: builder.mutation({
            query: () => ({ url: 'testimonials/seed', method: 'POST' }),
            invalidatesTags: ['Testimonial'],
        }),
    }),
});

export const {
    useGetTestimonialSettingsQuery,
    useUpdateTestimonialSettingsMutation,
    useGetAllTestimonialsQuery,
    useGetActiveTestimonialsQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
    useSeedTestimonialsMutation,
} = testimonialApi;
