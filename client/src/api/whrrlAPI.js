import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const whrllAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: async headers => {
      // GEt token

      const token = 'this is the token';
      console.log(token);

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
