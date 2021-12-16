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
    })
  })
});

export const { useGetUserByIdMutation,
  useRegisterUserMutation, useLoginUserMutation } = whrrlUserAPI;
