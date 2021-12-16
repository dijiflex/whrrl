import whrllAPI from './whrrlAPI';

export const whrrlUserAPI = whrllAPI.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.mutation({
      query: id => ({ url: `/users/${id}`, method: 'GET' })
    })
  })
});

export const { useGetUserByIdMutation } = whrrlUserAPI;
