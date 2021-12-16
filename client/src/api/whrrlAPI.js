import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const whrllAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3080/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().userState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({}),
  tagTypes: ['Users']
});

export default whrllAPI;
