import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bgRemoved: null
}

const removeBackground = createSlice({
    name: 'removeBg',
    initialState,
    reducers: {
        setActionStatus: (state, action ) => {
            return { ...state, bgRemoved: action.payload };
        },
    },
});

const changeBackground = createSlice({
    name: 'changeBg',
    initialState,
    reducers: {
        setActionChangeStatus: (state, action ) => {
            return { ...state, bgChanged: action.payload };
        },
    },
});

export const { setActionStatus } = removeBackground.actions;
export const { setActionChangeStatus } = changeBackground.actions;
export default removeBackground.reducer