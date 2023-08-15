import { apiSlice } from "./apiSlice";

const HOUSES_URL= 'https://localhost:5000/api/houses';

export const usersApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: (builder) => ({
         upload:builder.mutation({
                query: (data) => ({
                    url: 'http://localhost:5000/api/houses/',
                    method:'POST',
                    body:data
                }), 
                // invalidatesTags: ["House"]
            }),
            getHouses: builder.query({
                query: (data) => ({
                    url: `${HOUSES_URL}/`,
                    providesTags: ["House"]
                })
            })
        })
    }
)

export const { useUploadMutation, useGetHousesMutation} = usersApiSlice;
