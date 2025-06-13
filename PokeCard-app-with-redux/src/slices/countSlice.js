import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const countInitialState = {
    count: 1,
    limit: 20,
    status: "idle",
    error: null,
    card: {
        id: null,
        name: "",
        height: null,
        pokeImage: null,
    },
}

export const fetchCard = createAsyncThunk("coutSlice/fetchCard", async (_, {rejectWithValue})=>{
    try{
        // axios response format:
        // {
        //     // Response data from server
        //     data: {},       // This contains the actual API response body
            
        //     // Metadata about the response
        //     status: 200,    // HTTP status code
        //     statusText: 'OK',
        //     headers: {},
        //     config: {},
        //     request: {}
        //   }

        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto", {
            timeout: 5000,
        });
        const cardData = {
            id: response.data.id,
            name: response.data.name,
            height: response.data.height,
            pokeImage: response.data.sprites.front_default,
        }
        return cardData;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

const countSlice = createSlice({
    name: "countSlice",
    initialState: countInitialState,
    reducers: {
        increment: (state) => {
            if(state.count < state.limit){
                state.count += 1;
            }
        },
        decrement: (state) => {
            if(state.count > 1){
                state.count -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase("planSlice/shiftToPremium", (state) => {
            state.limit = 40;
        })
        .addCase(fetchCard.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchCard.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.card = action.payload;
        })
        .addCase(fetchCard.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
});

export default countSlice.reducer;
export const {increment, decrement} = countSlice.actions;