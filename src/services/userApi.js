import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_URL}/users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: '/',
        params: {
          status: params?.status,
          searchTerm: params?.searchTerm,
          page: params?.page || 1,
          limit: params?.limit || 10,
        },
      }),
      providesTags: ['User'],
    }),
    getUserStats: builder.query({
      query: () => '/stats',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    
    getUserDashboard: builder.query({
      query: (period) => ({
        url: '/dashboard',
        params: { period }
      }),
      providesTags: ['User'],
    }),
    getUserOrders: builder.query({
      query: (status) => ({
        url: '/orders',
        params: { status: status !== 'all' ? status : undefined }
      }),
      providesTags: ['User'],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    getUserHistory: builder.query({
      query: (period) => ({
        url: '/history',
        params: { period }
      }),
      providesTags: ['User'],
    }),
    addMoney: builder.mutation({
      query: (amount) => ({
        url: '/add-money',
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: ['User'],
    }),
    payAllPending: builder.mutation({
      query: () => ({
        url: '/pay-all-pending',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/pay`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    
    // AUTH ENDPOINTS
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    sendOtp: builder.mutation({
      query: ({ identifier, type }) => ({
        url: '/send-otp',
        method: 'POST',
        body: { identifier, type },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ identifier, otp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { identifier, otp },
      }),
    }),

    // PROFILE ENDPOINTS
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/change-password',
        method: 'PUT',
        body: passwordData,
      }),
      invalidatesTags: ['User'],
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: '/upload-avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserStatsQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  
  // Dashboard hook
  useGetUserDashboardQuery,
  useGetUserOrdersQuery,
  useCancelOrderMutation,
  useGetUserHistoryQuery,
  
  // Auth hooks
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,

  // Profile hooks
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useAddMoneyMutation,
  usePayAllPendingMutation,
  usePayOrderMutation,
  useDeleteOrderMutation,
} = userApi;
