import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../config/apiConfig';

export const dynamicShopApi = createApi({
    reducerPath: 'dynamicShopApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/dynamic-shop`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['ShopContent', 'ShopCategory', 'ShopProduct', 'ShopOverview'],
    endpoints: (builder) => ({
        getShopData: builder.query({
            query: (shopType) => `/${shopType}/data`,
            providesTags: (result, error, shopType) => [{ type: 'ShopContent', id: shopType }, { type: 'ShopCategory', id: shopType }, { type: 'ShopProduct', id: shopType }],
        }),
        getShopOverview: builder.query({
            query: () => '/overview',
            providesTags: ['ShopOverview'],
        }),
        updateShopContent: builder.mutation({
            query: ({ shopType, data }) => ({
                url: `/${shopType}/content`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { shopType }) => [{ type: 'ShopContent', id: shopType }, 'ShopOverview'],
        }),
        updateShopStatus: builder.mutation({
            query: (data) => ({
                url: '/status',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['ShopContent', 'ShopOverview'],
        }),
        addCategory: builder.mutation({
            query: ({ shopType, data }) => ({
                url: `/${shopType}/categories`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { shopType }) => [{ type: 'ShopCategory', id: shopType }, 'ShopOverview'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShopCategory', 'ShopOverview'],
        }),
        addProduct: builder.mutation({
            query: ({ shopType, data }) => ({
                url: `/${shopType}/products`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { shopType }) => [{ type: 'ShopProduct', id: shopType }, 'ShopOverview'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['ShopProduct', 'ShopOverview'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShopProduct', 'ShopOverview'],
        }),
        seedShop: builder.mutation({
            query: (shopType) => ({
                url: `/${shopType}/seed`,
                method: 'POST',
            }),
            invalidatesTags: ['ShopContent', 'ShopCategory', 'ShopProduct', 'ShopOverview'],
        }),
        seedAllShops: builder.mutation({
            query: () => ({
                url: '/seed-all',
                method: 'POST',
            }),
            invalidatesTags: ['ShopContent', 'ShopCategory', 'ShopProduct', 'ShopOverview'],
        }),
    }),
});

export const {
    useGetShopDataQuery,
    useGetShopOverviewQuery,
    useUpdateShopContentMutation,
    useUpdateShopStatusMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSeedShopMutation,
    useSeedAllShopsMutation
} = dynamicShopApi;
