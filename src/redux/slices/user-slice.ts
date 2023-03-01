/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    loading: boolean,
    error: boolean,
    error400: boolean,
}

const initialState: IInitialState = {
    loading: false,
    error: false,
    error400: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state) => {
            state.error = true;
        },
        resetError: (state) => {
            state.error = false;
        },
        setError400: (state) => {
            state.error400 = true;
        },
        resetError400: (state) => {
            state.error400 = false
        },
        setLoadingStatus: (state) => {
            state.loading = true;
        },
        resetLoadingStatus: (state) => {
            state.loading = false;
        }
    }
})

const { actions, reducer } = userSlice;

export const userReducer = reducer;

export const { setError, resetError, resetLoadingStatus, setError400, resetError400, setLoadingStatus } = actions;
