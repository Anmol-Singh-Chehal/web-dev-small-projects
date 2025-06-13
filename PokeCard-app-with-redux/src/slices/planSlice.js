import { createSlice } from "@reduxjs/toolkit";

const planInitialState = {
    type: "non premium",
    paid: 0,
}

const planSlice = createSlice({
    name: "planSlice",
    initialState: planInitialState,
    reducers: {
        shiftToPremium: (state, action) => {
            if(state.type === "non premium"){
                state.paid += action.payload;
                state.type = "premium";
            }
        }
    }
});

export default planSlice.reducer;
export const {shiftToPremium} = planSlice.actions;