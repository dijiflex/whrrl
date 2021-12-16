import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const whrllAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3080/api/v1',
    prepareHeaders: async headers => {
      // GEt token
      console.log(process.env.REACT_APP_API_URL);

      const token = 'thisisthetoken';
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
