import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        getProducts: builder.query({

            query: ({ keyword, pageNumber}) => ({

                url: PRODUCTS_URL,
                params: { keyword, pageNumber }
            }),

            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),

        getProductDetails: builder.query({

            query: (productId) => ({

                url: `${PRODUCTS_URL}/${productId}`

            }),

            keepUnusedDataFor: 5
        }),

        createAdminProduct: builder.mutation({

            query: () => ({

                url: PRODUCTS_URL,
                method: 'POST'
               
            }),

            invalidatesTags: ['Product']
        }),

        updateAdminProduct: builder.mutation({

            query: (data) => ({

                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Products']
        }),

        uploadImage: builder.mutation({

            query: (data) => ({

                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        }),

        deleteProduct: builder.mutation({

            query: (productId) => ({

                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            })
        }),

        productReview: builder.mutation({

            query: (data) => ({

                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Product']
        }),

        getTopRatedProducts: builder.query({

            query: () => ({

                url: `${PRODUCTS_URL}/top`
            }),

            keepUnusedDataFor: 5
        })
    })
})

export const { 
      useGetProductsQuery,
      useGetProductDetailsQuery,
      useCreateAdminProductMutation,
      useUpdateAdminProductMutation,
      useUploadImageMutation,
      useProductReviewMutation,
      useDeleteProductMutation,
      useGetTopRatedProductsQuery,
     } = productApiSlice;