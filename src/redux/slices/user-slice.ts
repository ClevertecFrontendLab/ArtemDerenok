/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    loading: boolean,
    error: boolean,
    error400: boolean,
    data: {
        jwt: string | null,
        user: {
            username: string | null,
            email: string | null,
            provider: string | null,
            confirmed: boolean | null,
            blocked: boolean | null,
            createdAt: string | null,
            updatedAt: string | null,
            firstName: string | null,
            lastName: string | null,
            phone: string | null
        }
    }
}

const initialState: IInitialState = {
    loading: false,
    error: false,
    error400: false,
    data: {
        jwt: null,
        user: {
            username: null,
            email: null,
            provider: null,
            confirmed: null,
            blocked: null,
            createdAt: null,
            updatedAt: null,
            firstName: null,
            lastName: null,
            phone: null
        }
    }
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
        },
        setUserData: (state, actions) => {
            state.data = actions.payload;
        }
    }
})

const { actions, reducer } = userSlice;

export const userReducer = reducer;

export const { setError, resetError, resetLoadingStatus, setError400, resetError400, setLoadingStatus, setUserData } = actions;
