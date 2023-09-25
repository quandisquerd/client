
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        fetchFn: async (...args) => {
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => ({
                url: `users`,
            }),
            providesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: `adduser`,
                method: 'POST',
                body: data,

            }),
            invalidatesTags: ['User'],
        })
    })
})
export const { useGetAllUserQuery, useAddUserMutation } = userApi
export default userApi