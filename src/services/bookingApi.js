import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('aji_user_token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Bookings', 'User'],
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
            invalidatesTags: ['Bookings', 'User'],
        }),
        updateBooking: builder.mutation({
            query: ({ id, formData }) => ({
                url: `bookings/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Bookings', 'User'],
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `bookings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings', 'User'],
        }),
        toggleActiveBooking: builder.mutation({
            query: (id) => ({
                url: `bookings/toggle-active/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Bookings', 'User'],
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
