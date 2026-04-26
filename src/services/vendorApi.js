import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/vendors`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Vendor', 'VendorService', 'Booking', 'Donation', 'Event', 'Staff', 'Transaction'],
  endpoints: (builder) => ({
    loginVendor: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    sendVendorOtp: builder.mutation({
      query: ({ identifier, type }) => ({
        url: '/send-otp',
        method: 'POST',
        body: { identifier, type },
      }),
    }),
    verifyVendorOtp: builder.mutation({
      query: ({ identifier, otp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { identifier, otp },
      }),
    }),
    getDashboardStats: builder.query({
      query: (id) => `/dashboard-stats/${id}`,
      providesTags: ['Vendor'],
    }),
    getVendorProfile: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Vendor'],
    }),
    updateVendorProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Vendor'],
    }),
    getVendorServices: builder.query({
      query: (vendorId) => `/services/${vendorId}`,
      providesTags: ['VendorService'],
    }),
    addVendorService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['VendorService'],
    }),
    updateVendorService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['VendorService'],
    }),
    deleteVendorService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VendorService'],
    }),
    getVendorBookings: builder.query({
      query: (vendorId) => `/bookings/${vendorId}`,
      providesTags: ['Booking'],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Booking'],
    }),
    getVendorDonations: builder.query({
      query: (vendorId) => `/donations/${vendorId}`,
      providesTags: ['Donation'],
    }),
    getVendorEvents: builder.query({
      query: (vendorId) => `/events/${vendorId}`,
      providesTags: ['Event'],
    }),
    addVendorEvent: builder.mutation({
      query: (data) => ({
        url: '/events',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    updateVendorEvent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteVendorEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
    getVendorStaff: builder.query({
      query: (vendorId) => `/staff/${vendorId}`,
      providesTags: ['Staff'],
    }),
    addVendorStaff: builder.mutation({
      query: (data) => ({
        url: '/staff',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
    updateVendorStaff: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/staff/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
    deleteVendorStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Staff'],
    }),
    getVendorTransactions: builder.query({
      query: (vendorId) => `/transactions/${vendorId}`,
      providesTags: ['Transaction'],
    }),
    addVendorTransaction: builder.mutation({
      query: (data) => ({
        url: '/transactions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transaction'],
    }),
    getPublicVendorServices: builder.query({
      query: () => '/public/services',
      providesTags: ['VendorService'],
    }),
    getPublicVendorServiceById: builder.query({
      query: (idOrSlug) => `/public/services/${idOrSlug}`,
      providesTags: ['VendorService'],
    }),
    getAllAdminVendorServices: builder.query({
      query: (params) => ({
        url: '/admin/services',
        params: params
      }),
      providesTags: ['VendorService'],
    }),
    updateVendorServiceApproval: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/services/${id}/approval`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['VendorService'],
    }),
    uploadVendorFile: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
        // No need to set headers, browser will set it automatically for FormData
      }),
    }),
  }),
});

export const {
  useLoginVendorMutation,
  useSendVendorOtpMutation,
  useVerifyVendorOtpMutation,
  useGetDashboardStatsQuery,
  useGetVendorProfileQuery,
  useUpdateVendorProfileMutation,
  useGetVendorServicesQuery,
  useAddVendorServiceMutation,
  useUpdateVendorServiceMutation,
  useDeleteVendorServiceMutation,
  useGetVendorBookingsQuery,
  useUpdateBookingMutation,
  useGetVendorDonationsQuery,
  useGetVendorEventsQuery,
  useAddVendorEventMutation,
  useUpdateVendorEventMutation,
  useDeleteVendorEventMutation,
  useGetVendorStaffQuery,
  useAddVendorStaffMutation,
  useUpdateVendorStaffMutation,
  useDeleteVendorStaffMutation,
  useGetVendorTransactionsQuery,
  useAddVendorTransactionMutation,
  useGetPublicVendorServicesQuery,
  useGetPublicVendorServiceByIdQuery,
  useGetAllAdminVendorServicesQuery,
  useUpdateVendorServiceApprovalMutation,
  useUploadVendorFileMutation,
} = vendorApi;
