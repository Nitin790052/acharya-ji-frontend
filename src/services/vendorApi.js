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
  tagTypes: ['Vendor'],
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
  }),
});

export const {
  useLoginVendorMutation,
  useSendVendorOtpMutation,
  useVerifyVendorOtpMutation,
} = vendorApi;
