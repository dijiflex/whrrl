import whrllAPI from './whrrlAPI';

export const whrrlUserAPI = whrllAPI.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.mutation({
      query: id => ({ url: `/users/${id}`, method: 'GET' })
    }),
    registerUser: builder.mutation({
      query: body => ({ url: '/users/signup', method: 'POST', body })
    }),
    loginUser: builder.mutation({
      query: body => ({ url: '/users/login', method: 'POST', body })
    }),
    updateMe: builder.mutation({
      query: body => ({ url: '/users/updateMe', method: 'PATCH', body })
    }),
    getMe: builder.query({
      query: () => ({ url: '/users/me', method: 'GET' })
    })
  })
});

export const { useGetUserByIdMutation,
  useRegisterUserMutation, useLoginUserMutation,
  useUpdateMeMutation, useGetMeQuery } = whrrlUserAPI;
