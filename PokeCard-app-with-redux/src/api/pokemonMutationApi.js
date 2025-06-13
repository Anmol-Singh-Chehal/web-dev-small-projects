import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pokemonMutationApi = createApi({
    reducerPath: "pokemonMutationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
        timeout: 5000,
    }),
    endpoints: (builder) => ({
        updatePokemon: builder.mutation({
            query: (data) => ({
                url: `/pokemon/${data.id}`,
                method: "POST",
                body: data,
            })
        })
    })
});

export const {useUpdatePokemonMutation} = pokemonMutationApi;
export default pokemonMutationApi;