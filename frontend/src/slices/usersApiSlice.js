import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        login: builder.mutation({

            query: (data) => ({

                url: `${ USERS_URL }/login`,
                method: 'POST',
                body: data

            }),

        }),

        register: builder.mutation({

            query: (data) => ({

                url: `${ USERS_URL }`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({

            query: () => ({

                url: `${ USERS_URL }/logout`,
                method: 'POST',
            })
        }),

        userProfile: builder.mutation({

            query: (data) => ({

                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),

        getUsers: builder.query({

            query: () => ({

                url: USERS_URL
            }),

            keepUnusedDataFor: 5,
            providesTags: ['Users']
        }),

        deleteUser: builder.mutation({

            query: (userId) => ({

                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),

        userDetails: builder.query({

            query: (userId) => ({

                url: `${USERS_URL}/${userId}`
            }),

            keepUnusedDataFor: 5
        }),

        updateUser: builder.mutation({

            query: (data) => ({

                url: `${USERS_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['User']
        })
    })
})

export const {
    useUserProfileMutation, 
     useLoginMutation,
     useLogoutMutation,
     useRegisterMutation,
     useGetUsersQuery,
     useDeleteUserMutation,
     useUserDetailsQuery,
     useUpdateUserMutation,
     } = usersApiSlice