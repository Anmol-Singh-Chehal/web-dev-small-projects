import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

let page = 1;

const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://pokeapi.co/api/v2/",
        timeout: 5000,
    }),
    endpoints: (builder) => ({
        getPokemonByCount: builder.query({
            query: (count) => {
                page += 1;
                const offset = (page-1)*count;
                return `pokemon?limit=${count}&offset=${offset}`;
            },
            keepUnusedDataFor: (60*2),
            transformResponse: async (response) => {
                const pokemonList = await Promise.all(
                    response.results.map(async (pokemon) => {
                        try{
                            const pokemonResponse = await fetch(pokemon.url);
                            if(!pokemonResponse.ok){
                                throw new Error(`Failed to fetch ${pokemon.name} Details!`);
                            }
                            const pokemonData = await pokemonResponse.json();
                            return {
                                id: pokemonData.id,
                                name: pokemonData.name,
                                height: pokemonData.height,
                                pokeImage: pokemonData.sprites.front_default,
                            };

                        }catch(error){
                            return {
                                id: null,
                                name: pokemon.name,
                                height: null,
                                pokeImage: null,
                                error: error.message,
                            };
                        }
                        
                    })
                )
                return pokemonList;
            }
        }),

        getPokemonByName: builder.query({
            query: (name) => {
                return `pokemon/${name}`;
            },
            transformResponse: (response) => ({
                id: response.id,
                name: response.name,
                height: response.height,
                pokeImage: response.sprites.front_default,
            })
        }),
    })
});

export const {useGetPokemonByCountQuery, useGetPokemonByNameQuery, useLazyGetPokemonByCountQuery, useLazyGetPokemonByNameQuery} = pokemonApi;
export default pokemonApi;