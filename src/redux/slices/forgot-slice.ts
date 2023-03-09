/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    loading: boolean,
    error: boolean
}

const initialState: IInitialState = {
    loading: false,
    error: false,
}

const forgotSlice = createSlice({
    name: 'forgot',
    initialState,
    reducers: {
        setErrorForgot: (state) => {
            state.error = true;
        },
        resetErrorForgot: (state) => {
            state.error = false;
        },
        setLoadingStatusForgot: (state) => {
            state.loading = true;
        },
        resetLoadingStatusForgot: (state) => {
            state.loading = false;
        }
    }
})

const { actions, reducer } = forgotSlice;

export const forgotReducer = reducer;

export const { setErrorForgot, resetErrorForgot, setLoadingStatusForgot, resetLoadingStatusForgot } = actions;
