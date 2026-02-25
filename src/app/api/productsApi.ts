import { baseApi } from './baseApi';
import type { Product, ProductsResponse } from '../../entities/product/model/types';

interface GetProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, GetProductsParams | void>({
      query: (params = {}) => {
        const { limit, skip, q } = params as GetProductsParams;
        if (q) {
          return { url: '/products/search', params: { q, limit, skip } };
        }
        return { url: '/products', params: { limit, skip } };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
