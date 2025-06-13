import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slices/countSlice"
import planReducer from "./slices/planSlice"
import pokemonApi from "./api/pokemonApi"
import pokemonMutationApi from "./api/pokemonMutationApi";

const store = configureStore({
    reducer: {
        countSlice: countReducer,
        planSlice: planReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [pokemonMutationApi.reducerPath]: pokemonMutationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pokemonApi.middleware).concat(pokemonMutationApi.middleware);
    },

});


export default store;