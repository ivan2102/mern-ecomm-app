import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        createOrder: builder.mutation({

            query: (order) => ({

                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),

        orderDetails: builder.query({

            query: (orderId) => ({

                url: `${ORDERS_URL}/${orderId}`
            }),

            keepUnusedDataFor: 5
        }),

        orderPay: builder.mutation({

            query: ({ orderId, details }) => ({

                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details }
            })
        }),

        getAllOrders: builder.query({

            query: () => ({

                url: `${ORDERS_URL}/myorders`
            }),

            keepUnusedDataFor: 5
        }),

        getPayPalClientId: builder.query({

            query: () => ({

                url: PAYPAL_URL
            }),

            keepUnusedDataFor: 5
        }),

        getAdminOrders: builder.query({

            query: () => ({

                url: ORDERS_URL
            }),

            keepUnusedDataFor: 5
        }),

        getDeliveredAdminOrders: builder.mutation({

            query: (orderId) => ({

                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT'
            })
        })
    })
})

export const { 
      useGetAllOrdersQuery,
      useCreateOrderMutation,
      useOrderDetailsQuery,
      useOrderPayMutation,
      useGetPayPalClientIdQuery ,
      useGetAdminOrdersQuery,
      useGetDeliveredAdminOrdersMutation,
    } = orderApiSlice