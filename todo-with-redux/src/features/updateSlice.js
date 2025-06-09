import { createSlice } from "@reduxjs/toolkit";

const updateInitialState = {
    isUpdateModeOn: false,
}

export const updateSlice = createSlice({
    name: "updateProfile",
    initialState: updateInitialState,
    reducers: {
        updateOn: (state) => {
            state.isUpdateModeOn = true;
        },
        updateOff: (state) => {
            state.isUpdateModeOn = false;
        },
    },
});

export const { updateOn, updateOff } = updateSlice.actions;
export default updateSlice.reducer;