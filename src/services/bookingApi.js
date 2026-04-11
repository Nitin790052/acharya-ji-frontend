import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Bookings'],
    endpoints: (builder) => ({
        getAllBookings: builder.query({
            query: () => 'bookings',
            providesTags: ['Bookings'],
        }),
        createBooking: builder.mutation({
            query: (formData) => ({
                url: 'bookings',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Bookings'],
        }),
        updateBooking: builder.mutation({
            query: ({ id, formData }) => ({
                url: `bookings/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Bookings'],
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `bookings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings'],
        }),
        toggleActiveBooking: builder.mutation({
            query: (id) => ({
                url: `bookings/toggle-active/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Bookings'],
        }),
    }),
});

export const {
    useGetAllBookingsQuery,
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useToggleActiveBookingMutation,
} = bookingApi;
